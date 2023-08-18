const db = require('../config/database');

async function getRecipe(recipe_id) {
    const query = `
    SELECT 
        r.*, 
        COUNT(DISTINCT rr.id) AS rating_count, 
        AVG(rr.rating) AS recipe_rating_avg, 
        COUNT(DISTINCT c.id) AS comments_count, 
        COUNT(DISTINCT rp.id) AS photos_count 
    FROM 
        recipes r 
    LEFT JOIN 
        recipe_ratings rr ON r.id = rr.recipe_id 
    LEFT JOIN 
        comments c ON r.id = c.recipe_id 
    LEFT JOIN 
        recipe_photos rp ON r.id = rp.recipe_id 
    WHERE 
        r.id = ? 
    GROUP BY r.id`

    const [recipe, _fields] = await db.promise().query(query, [recipe_id]);

    return recipe;
}

async function getRecipeIngredients(recipe_id) {
    const query = `
    SELECT 
        ri.amount,
        ru.unit AS unit,
        i.ingredient AS ingredient
    FROM 
        recipe_ingredients ri 
    LEFT JOIN 
        recipe_units ru ON ri.unit_id = ru.id 
    LEFT JOIN 
        ingredients i ON ingredient_id = i.id 
    WHERE 
        ri.recipe_id = ?`

    const [ingredients, _getRecipeIngredientsFields] = await db.promise().query(query, [recipe_id]);

    return ingredients;
}

async function getRecipeDirections(recipe_id) {
    const query = `
    SELECT 
        rd.* 
    FROM 
        recipe_directions rd
    WHERE 
        rd.recipe_id = ?`

    const [directions, _getRecipeDirections] = await db.promise().query(query, [recipe_id]);

    return directions;
}

async function getRecipeComments(recipe_id) {
    const query = `
    SELECT 
        comments.*, 
        COUNT(l.id) AS likes 
    FROM 
        comments 
    LEFT JOIN 
        likes l ON comments.id = l.comment_id 
    WHERE 
        recipe_id = ? 
    GROUP BY 
        comments.id`

    const [comments, _fields] = await db.promise().query(query, [recipe_id]);

    return comments;
}

async function getRecipePhotos(recipe_id) {
    const query = `
    SELECT 
        * 
    FROM 
        recipe_photos rp 
    WHERE 
        rp.recipe_id = ?`

    const [photos, _fields] = await db.promise().query(query, [recipe_id]);

    return photos;
}

async function getUserRecipeCommentLikes(recipe_id, user) {
    if (!user || !user.id) return [];

    const query = `
    SELECT 
        comments.id 
    FROM 
        likes 
    LEFT JOIN 
        comments ON likes.comment_id = comments.id 
    WHERE 
        recipe_id = ? AND likes.user_id = ?`

    let [commentLikes, _fields] = await db.promise().query(query, [recipe_id, user.id]);

    commentLikes = commentLikes.map((row) => Object.values(row)[0]);

    return commentLikes;
}

async function createRecipe(user, body) {
    const insertQuery = `
    INSERT INTO 
        recipes 
    SET 
        ?`

    const [_insertRows, _insertFields] = await db.promise().query(insertQuery, {
        submit_user_id: user.id,
        submit_user_first_name: user.f_name,
        submit_user_last_name: user.l_name,
        r_title: body.recipeTitle,
        description: body.recipeDescription,
        servings: body.recipeServings,
        prep_time: body.recipePrepTime,
        cook_time: body.recipeCookTime,
    });
}

async function insertRecipePhoto(user, file) {
    const insertIdQuery = `
    SELECT 
        LAST_INSERT_ID()`

    const [insertIdRows, _insertIdFields] = await db.promise().query(insertIdQuery);

    let newRecipeId = (Object.values(insertIdRows[0]));

    if (!file) {
    } else {
        const insertRecipePhotoQuery = `
        INSERT INTO 
            recipe_photos 
        SET 
            ?`

        const [_insertRecipePhotoRows, _insertRecipePhotoFields] = await db.promise().query(insertRecipePhotoQuery, {
            recipe_id: newRecipeId,
            user_id: user.id,
            photo_url: file.path
        });
    }
}

async function createRecipeIngredient(body) {
    let allIngredientsObject = Object.create(null);

    for (const [key, value] of Object.entries(body)) {
        if (key.includes('ingredient')) {
            allIngredientsObject[`${key}`] = `${value}`;
        }
    }

    let ingredientObject = Object.create(null);
    let counter = 0
    let ingredientsArray = []
    let i = 1

    for (const [key, value] of Object.entries(allIngredientsObject)) {
        if (key.endsWith(i)) {
            ingredientObject[`${key}`] = `${value}`;
            counter++
            check();
        }
    }

    function check() {
        if (counter >= 3) {
            let newIngredientObject = ingredientObject
            ingredientsArray.push(newIngredientObject);
            counter = 0
            ingredientObject = Object.create(null);
            i++
        }
    }

    let ingredientsData = ingredientsArray;
    let newRecipeId;
    let amountId;
    let unitId;
    let ingredientId;

    async function getInsertedRecipeId() {
        const insertRecipeIdQuery = `
            SELECT 
                MAX(id) 
            FROM 
                recipes`
        const [insertRecipeIdRows, _insertRecipeIdFields] = await db.promise().query(insertRecipeIdQuery);
        return newRecipeId = (Object.values(insertRecipeIdRows[0]));
    }

    async function ingredientData() {
        ingredientsData.forEach(ingredient => {
            async function queryIngredientData() {
                for (const [key, value] of Object.entries(ingredient)) {
                    if (key.includes('ingredientAmount_')) {
                        async function insertRecipeIngredientAmount(amount) {
                            amountId = amount;
                        }
                        await insertRecipeIngredientAmount(value);
                    } else if (key.includes('ingredientUnit_')) {
                        async function insertRecipeIngredientUnit(unit) {
                            unitId = unit;
                        }
                        await insertRecipeIngredientUnit(value);
                    } else if (key.includes('ingredient_')) {
                        async function insertRecipeIngredient(ingredient) {
                            const checkIngredientQuery = `
                                SELECT 
                                    i.id
                                FROM 
                                    ingredients i
                                WHERE 
                                    i.ingredient = ?`
                            const [checkIngredientRows, _checkIngredientFields] = await db.promise().query(checkIngredientQuery, [ingredient.toLowerCase()]);

                            if (checkIngredientRows.length > 0) {
                                ingredientId = checkIngredientRows[0].id;
                            } else {
                                const insertIngredientQuery = `
                                    INSERT INTO 
                                        ingredients (ingredient)
                                    VALUES 
                                        (?)`
                                await db.promise().query(insertIngredientQuery, [ingredient.toLowerCase()]);

                                const insertIngredientIdQuery = `
                                    SELECT 
                                        MAX(id)
                                    FROM 
                                        ingredients`
                                const [insertIngredientIdRows, _insertIngredientIdFields] = await db.promise().query(insertIngredientIdQuery);
                                ingredientId = insertIngredientIdRows[0].id;
                            }
                        }
                        await insertRecipeIngredient(value);
                    }
                }
                async function insertIngredientData() {
                    const insertIngredientData = `
                        INSERT INTO 
                            recipe_ingredients (recipe_id, amount, unit_id, ingredient_id) 
                        VALUES 
                        (?, ?, ?, ?)`
                    await db.promise().query(insertIngredientData, [newRecipeId, amountId, unitId, ingredientId]);
                }
                insertIngredientData(newRecipeId, amountId, unitId, ingredientId);
            }
            queryIngredientData();
        });
    }
    async function insertedRecipeIngredientData() {
        await getInsertedRecipeId();
        await ingredientData();
    }
    insertedRecipeIngredientData();
}

async function insertRecipeDirections(body) {
    let allDirectionsObject = Object.create(null);
    let directionsArray = []

    for (const [key, value] of Object.entries(body)) {
        if (key.includes('recipeDirection')) {
            allDirectionsObject[`${key}`] = `${value}`;
            directionsArray.push(allDirectionsObject);
            allDirectionsObject = Object.create(null)
        }
    }

    let directionsData = directionsArray;
    let newRecipeId;
    let directionStep = 1;

    async function getInsertedRecipeId() {
        const insertRecipeIdQuery = `
            SELECT 
                MAX(id) 
            FROM 
                recipes`
        const [insertRecipeIdRows, _insertRecipeIdFields] = await db.promise().query(insertRecipeIdQuery);
        return newRecipeId = (Object.values(insertRecipeIdRows[0]));
    }

    async function directionData() {
        directionsData.forEach(direction => {
            for (const [key, value] of Object.entries(direction)) {
                let step = directionStep++;

                async function insertDirectionData() {
                    const insertQuery = `
                        INSERT INTO 
                            recipe_directions (recipe_id, direction_step, direction)
                        VALUES 
                            (?, ?, ?)`
                    await db.promise().query(insertQuery, [newRecipeId, step, value]);
                }
                insertDirectionData(newRecipeId, step, value);
            }
        });
    }
    async function insertRecipeDirectionData() {
        await getInsertedRecipeId();
        await directionData();
    }
    insertRecipeDirectionData();
}

async function deleteRecipe(recipeId) {
    const deleteRecipeQuery = `
        DELETE 
        FROM 
            recipes 
        WHERE 
            id = ${recipeId}`
    await db.promise().query(deleteRecipeQuery);

    const deleteRecipeRatings = `
        DELETE
        FROM 
            recipe_ratings 
        WHERE 
            recipe_id = ${recipeId}`
    await db.promise().query(deleteRecipeRatings);

    const deleteRecipePhotos = `
        DELETE
        FROM 
            recipe_photos 
        WHERE 
            recipe_id = ${recipeId}`
    await db.promise().query(deleteRecipePhotos);

    const deleteRecipeDirections = `
        DELETE
        FROM 
            recipe_directions 
        WHERE 
            recipe_id = ${recipeId}`
    await db.promise().query(deleteRecipeDirections);

    const deleteRecipeComments = `
        DELETE
        FROM 
            comments 
        WHERE 
            recipe_id = ${recipeId}`
    await db.promise().query(deleteRecipeComments);

    // ADD RECIPE ID TO LIKE SO CODE CAN DELETE LIKES
    // const deleteRecipeLikes = `
        // DELETE
        // FROM 
        //     recipe_likes 
        // WHERE 
        //     recipe_id = ${recipeId}`
    // await db.promise().query(deleteRecipeLikes);
}

module.exports = { getRecipe, getRecipeIngredients, getRecipeDirections, getRecipeComments, getRecipePhotos, getUserRecipeCommentLikes, createRecipe, insertRecipePhoto, createRecipeIngredient, insertRecipeDirections, deleteRecipe }