const db = require('../config/database');

async function getAllRecipes() {
    const getAllRecipesQuery = `
    SELECT 
        * 
    FROM 
        recipes 
    ORDER BY 
        id 
    DESC`

    const [allRecipes, _fields] = await db.promise().query(getAllRecipesQuery);

    return allRecipes;
}

async function getCategoryRecipes(category) {
    const getCategoryRecipesQuery = `
    SELECT 
        r.*, 
        rp.photo_url
    FROM 
        recipes r
    LEFT JOIN 
        recipe_photos rp ON r.id = rp.recipe_id
    WHERE 
        category = ?`

    const [categoryRecipesRows, _categoryRecipesFields] = await db.promise().query(getCategoryRecipesQuery, 
        ['breakfast']
        );

    return categoryRecipesRows;
}

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
        rf.fraction AS fraction,
        rfd.fraction_decimal AS fraction_decimal,
        ru.unit AS unit,
        i.ingredient AS ingredient
    FROM 
        recipe_ingredients ri 
    LEFT JOIN 
        recipe_fractions rf ON ri.fraction_id = rf.id
    LEFT JOIN 
		recipe_fractions rfd ON ri.fraction_id = rfd.id
    LEFT JOIN 
        recipe_units ru ON unit_id = ru.id 
    LEFT JOIN 
        ingredients i ON ingredient_id = i.id 
    WHERE 
        ri.recipe_id = ?`

    const [ingredients, _getRecipeIngredientsFields] = await db.promise().query(query, [recipe_id]);

    return ingredients;
}

async function getRecipeIngredientsAndValueNumbers(recipeId) {
    const query = `
    SELECT 
        ri.amount, fraction, unit, 
        rfv.id AS fraction_value_id,
        ru.id AS unit_value_id,
        i.ingredient AS ingredient
    FROM 
        recipe_ingredients ri 
    LEFT JOIN 
        recipe_fractions rfv ON ri.fraction_id = rfv.id
    LEFT JOIN 
        recipe_units ru ON unit_id = ru.id 
    LEFT JOIN 
        ingredients i ON ingredient_id = i.id 
    WHERE 
        ri.recipe_id = ?`

    const [ingredientRows, _ingredientFields] = await db.promise().query(query, [recipeId])

    return ingredientRows;
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

async function getRecipeRatings(recipeId, user) {
    if (!user || !user.id) {
        return undefined;
    } else {
        const query = `
        SELECT 
            * 
        FROM 
            recipe_ratings 
        WHERE 
            recipe_id = ? 
        AND 
            user_id = ?`

        const [ratingRows, _ratingFields] = await db.promise().query(query, [recipeId, user.id]);

        return ratingRows;
    }
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
        category: body.recipeCategory
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
            counter++;
            check();
        }
    }

    function check() {
        if (counter >= 4) {
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
    let fractionId;
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
                    } else if (key.includes('ingredientFraction_')) {
                        async function insertRecipeIngredientFrction(fraction) {
                            fractionId = fraction;
                        }
                        await insertRecipeIngredientFrction(value);
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
                            recipe_ingredients (recipe_id, amount, fraction_id, unit_id, ingredient_id) 
                        VALUES 
                        (?, ?, ?, ?, ?)`
                    await db.promise().query(insertIngredientData, [newRecipeId, amountId, fractionId, unitId, ingredientId]);
                }
                insertIngredientData(newRecipeId, amountId, fractionId, unitId, ingredientId);
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

async function updateRecipe(recipeId, body) {
    const updateQuery = `
    UPDATE 
        recipes 
    SET 
        ? 
    WHERE 
        id = ${recipeId}`

    const [_updateRows, _updateFields] = await db.promise().query(updateQuery, {
        r_title: body.recipeTitle,
        description: body.recipeDescription,
        servings: body.recipeServings,
        prep_time: body.recipePrepTime,
        cook_time: body.recipeCookTime
    });
}

async function updateRecipeIngredients(recipeId, body) {
    const getQuery = `
    SELECT 
        ri.id, amount, fraction_id, unit_id,
        i.ingredient AS ingredient
    FROM 
        recipe_ingredients ri
    LEFT JOIN 
        ingredients i ON  ri.ingredient_id = i.id
    WHERE 
        recipe_id = ?`

    const [getRows, _getFields] = await db.promise().query(getQuery, [recipeId]);

    let allIngredientsObject = Object.create(null);
    let count = 0;
    let quarterCounter;

    for (const [key, value] of Object.entries(body)) {
        if (key.includes('ingredient')) {
            allIngredientsObject[`${key}`] = `${value}`;
            count++
        }
    }

    quarterCounter = count / 4;

    function splitObjects(allIngredientsObject, quarterCounter) {
        let counter = 0;
        let ingredientObject = Object.create(null);
        let ingredientsArray = [];

        for (const [key, value] of Object.entries(allIngredientsObject)) {
            for (let i = 0; i <= quarterCounter; i++) {
                if (key.endsWith('_' + i)) {
                    ingredientObject[`${key}`] = `${value}`;
                    counter++;
                    check(i);
                }
            }

            function check(i) {
                if (counter >= 4) {
                    let newIngredientObject = ingredientObject
                    ingredientsArray.push(newIngredientObject);
                    counter = 0
                    ingredientObject = Object.create(null);
                    i++
                }
            }
        }

        let ingredientData = ingredientsArray;

        function checkIngredientMatch(recipeId, ingredientData, getRows) {
            if (quarterCounter < getRows.length) {
                for (let i = quarterCounter; i < getRows.length; i++) {
                    let deleteRow = getRows[i];

                    Object.entries(deleteRow).forEach(([key, value]) => {
                        if (key == "id") {
                            deleteIngredient(value);
                        }
                    })
                }

                async function deleteIngredient(deleteId) {
                    const deleteQuery = `
                    DELETE 
                    FROM 
                        recipe_ingredients 
                    WHERE 
                        id = ?`
                    await db.promise().query(deleteQuery, [deleteId]);
                }
            } else {
                for (let i = 0; i < ingredientData.length; i++) {
                    let newIngredient = ingredientData[i];
                    let getRow = getRows[i];

                    getNewIngredientValue(recipeId, newIngredient, getRow);
                }
            }

            function getNewIngredientValue(recipeId, newIngredient, getRow) {
                let amountNew;
                let fractionNew;
                let unitNew;
                let ingredientNew;
                let count = 0;
                console.log(newIngredient)
                for (const [key, value] of Object.entries(newIngredient)) {
                    if (key.includes('ingredientAmount_')) {
                        amountNew = value;
                        count++
                    } else if (key.includes('ingredientFraction_')) {
                        fractionNew = value;
                        count++
                    } else if (key.includes('ingredientUnit_')) {
                        unitNew = value;
                        count++
                    } else if (key.includes('ingredient_')) {
                        ingredientNew = value;
                        count++
                    }

                    if (count >= 4) {
                        getOldIngredientValue(recipeId, amountNew, fractionNew, unitNew, ingredientNew, getRow);
                        count = 0;
                    }
                }
            }

            async function getOldIngredientValue(recipeId, amountNew, fractionNew, unitNew, ingredientNew, getRow) {
                let id;
                let amount;
                let fraction;
                let unit;
                let ingredient;
                let count = 0;

                if (getRow != undefined) {
                    for (const [key, value] of Object.entries(getRow)) {
                        if (key == 'id') {
                            id = value
                            count++
                        } else if (key.includes('amount')) {
                            amount = value;
                            count++
                        } else if (key.includes('fraction_id')) {
                            fraction = value;
                            count++
                        } else if (key.includes('unit_id')) {
                            unit = value;
                            count++
                        } else if (key.includes('ingredient')) {
                            ingredient = value;
                            count++
                        }

                        if (count >= 5) {
                            checkIfIngredientChange(id, recipeId, amount, fraction, unit, ingredient, amountNew, fractionNew, unitNew, ingredientNew);
                            count = 0;
                        }
                    }
                } else {
                    const updateNewIngredient = await getIngredientId(ingredientNew);
                    insertNewIngredient(recipeId, amountNew, fractionNew, unitNew, updateNewIngredient);
                }
            }

            async function checkIfIngredientChange(id, recipeId, amount, fraction, unit, _ingredient, amountNew, fractionNew, unitNew, ingredientNew) {
                let updateAmount;
                let updateFraction;
                let updateUnit;
                let newUpdateIngredient;
                let updateIngredient
                let updateIngredientId;

                newUpdateIngredient = ingredientNew.toLowerCase();
                updateIngredientId = await getIngredientId(newUpdateIngredient);
                updateIngredient = updateIngredientId;

                if (amountNew == amount) {
                    updateAmount = amount;
                } else if (amountNew != amount) {
                    updateAmount = amountNew;
                }

                if (fractionNew == fraction) {
                    updateFraction = fraction;
                } else if (fractionNew != fraction) {
                    updateFraction = fractionNew;
                }

                if (unitNew == unit) {
                    updateUnit = unit;
                } else if (unitNew != unit) {
                    updateUnit = unitNew;
                }

                updateNewIngredient(id, recipeId, updateAmount, updateFraction, updateUnit, updateIngredient);

                delete updateAmount;
                delete updateFraction;
                delete updateUnit;
                delete updateIngredient;
            }

            async function insertNewIngredient(recipeId, updateAmount, updateFraction, updateUnit, updateIngredient) {
                const insertQuery = `
                INSERT INTO 
                    recipe_ingredients
                SET 
                    ?`

                await db.promise().query(insertQuery, {
                    recipe_id: recipeId,
                    amount: updateAmount,
                    fraction_id: updateFraction,
                    unit_id: updateUnit,
                    ingredient_id: updateIngredient
                });
            }

            async function updateNewIngredient(id, recipeId, updateAmount, updateFraction, updateUnit, updateIngredient) {
                const updateQuery = `
                UPDATE 
                    recipe_ingredients 
                SET 
                    ?
                WHERE 
                    id = ${id}`
                const [_updateRows, _updateFields] = await db.promise().query(updateQuery, {
                    recipe_id: recipeId,
                    amount: updateAmount,
                    fraction_id: updateFraction,
                    unit_id: updateUnit,
                    ingredient_id: updateIngredient
                });
            }

            async function getIngredientId(updateIngredient) {
                const getQuery = `
                SELECT 
                    id 
                FROM 
                    ingredients 
                WHERE 
                    ingredient = ?`

                const [getIdRows, _getIdFields] = await db.promise().query(getQuery, [updateIngredient]);

                if (getIdRows.length > 0) {
                    for (const [_key, value] of Object.entries(getIdRows[0])) {
                        return value;
                    }
                } else {
                    let insertIngredientId = insertNewUpdateIngredient(updateIngredient);

                    return insertIngredientId;
                }
            }

            async function insertNewUpdateIngredient(updateIngredient) {
                const insertIngredientQuery = `
                INSERT INTO 
                    ingredients 
                SET 
                    ?`
                await db.promise().query(insertIngredientQuery, {
                    ingredient: updateIngredient
                });

                const ingredientIdQuery = `
                SELECT 
                    MAX(id) 
                FROM 
                    ingredients`
                const [idRows, _idFields] = await db.promise().query(ingredientIdQuery);

                for (const [key, value] of Object.entries(idRows[0])) {
                    if (key == 'MAX(id)') {
                        let id = value;

                        return id;
                    }
                }
            }
        }
        checkIngredientMatch(recipeId, ingredientData, getRows);
    }
    splitObjects(allIngredientsObject, quarterCounter);
}

async function updateRecipeDirections(recipeId, body) {
    const deleteQuery = `
    DELETE 
    FROM 
        recipe_directions 
    WHERE 
        recipe_id = ?`

    await db.promise().query(deleteQuery, [recipeId]);

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
    let directionStep = 1;

    async function directionData() {
        directionsData.forEach(direction => {
            for (const [_key, value] of Object.entries(direction)) {
                let step = directionStep++;

                async function insertDirectionData() {
                    const insertQuery = `
                    INSERT INTO 
                        recipe_directions (recipe_id, direction_step, direction)
                    VALUES
                        (?, ?, ?)`

                    await db.promise().query(insertQuery, [recipeId, step, value])
                }
                insertDirectionData(recipeId, step, value);
            }
        });
    }
    directionData();
}

module.exports = {
    getAllRecipes,
    getCategoryRecipes,
    getRecipe,
    getRecipeIngredients,
    getRecipeIngredientsAndValueNumbers,
    getRecipeDirections,
    getRecipeComments,
    getRecipePhotos,
    getRecipeRatings,
    getUserRecipeCommentLikes,
    createRecipe,
    insertRecipePhoto,
    createRecipeIngredient,
    insertRecipeDirections,
    updateRecipe,
    updateRecipeIngredients,
    updateRecipeDirections,
    deleteRecipe
}