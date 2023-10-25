const db = require('../../config/database');

async function createRecipe(user, body) {
    const createQuery = `
    INSERT INTO 
        recipes 
    SET 
        ?`

    const [_rows, _fields] = await db.promise().query(createQuery, {
        submit_user_id: user.id,
        submit_user_first_name: user.f_name,
        submit_user_last_name: user.l_name,
        r_title: body.recipeTitle.toLowerCase(),
        description: body.recipeDescription,
        servings: body.recipeServings,
        prep_time: body.recipePrepTime,
        cook_time: body.recipeCookTime,
        category: body.recipeCategory
    });
}

async function createRecipePhoto(user, file) {
    const getQuery = `
    SELECT 
        id 
    FROM 
        recipes 
    ORDER BY 
        id 
    DESC LIMIT 1`

    const [photoId, _fields] = await db.promise().query(getQuery);

    let newRecipeId = (Object.values(photoId[0]));

    if (file) {
        const createQuery = `
        INSERT INTO 
            recipe_photos 
        SET 
            ?`

        const [_rows, _fields] = await db.promise().query(createQuery, {
            recipe_id: newRecipeId,
            user_id: user.id,
            photo_url: file.path,
            file_name: file.filename
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
                let amountId;
                let fractionId;
                let unitId;
                let ingredientId;

                for (const [key, value] of Object.entries(ingredient)) {
                    if (key.includes('ingredientAmount_')) {
                        amountId = value;
                    } else if (key.includes('ingredientFraction_')) {
                        fractionId = value;
                    } else if (key.includes('ingredientUnit_')) {
                        unitId = value;
                    } else if (key.includes('ingredient_')) {
                        async function insertRecipeIngredient(ingredient) {
                            const checkIngredientQuery = `
                                SELECT 
                                    i.id
                                FROM 
                                    ingredients i
                                WHERE 
                                    i.ingredient = ?`
                            const [checkIngredientRows, _checkIngredientFields] = await db.promise().query(checkIngredientQuery, [
                                ingredient.toLowerCase()
                            ]);

                            if (checkIngredientRows.length > 0) {
                                ingredientId = checkIngredientRows[0].id;
                            } else {
                                const insertIngredientQuery = `
                                    INSERT INTO 
                                        ingredients (ingredient)
                                    VALUES 
                                        (?)`
                                const [insertIngredientQueryRows, _insertIngredientQueryFields] = await db.promise().query(insertIngredientQuery, [
                                    ingredient.toLowerCase()
                                ]);

                                ingredientId = insertIngredientQueryRows.insertId;
                            }
                        }
                        await insertRecipeIngredient(value);
                    }
                }

                async function insertIngredientData(newRecipeId, amountId, fractionId, unitId, ingredientId) {
                    const insertIngredientData = `
                        INSERT INTO 
                            recipe_ingredients (recipe_id, amount, fraction_id, unit_id, ingredient_id) 
                        VALUES 
                        (?, ?, ?, ?, ?)`
                    await db.promise().query(insertIngredientData, [
                        newRecipeId,
                        amountId,
                        fractionId,
                        unitId,
                        ingredientId
                    ]);
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

async function createRecipeDirections(body) {
    let allDirectionsObject = Object.create(null);
    let directionsArray = [];

    for (const [key, value] of Object.entries(body)) {
        if (key.includes('recipeDirection')) {
            allDirectionsObject[`${key}`] = `${value}`;
            directionsArray.push(allDirectionsObject);
            allDirectionsObject = Object.create(null);
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
        const [insertRecipeId, _fields] = await db.promise().query(insertRecipeIdQuery);
        return newRecipeId = (Object.values(insertRecipeId[0]));
    }

    async function directionData() {
        directionsData.forEach(direction => {
            for (const [_key, value] of Object.entries(direction)) {
                let step = directionStep++;

                async function createDirectionsData() {
                    const createQuery = `
                        INSERT INTO 
                            recipe_directions (recipe_id, direction_step, direction)
                        VALUES 
                            (?, ?, ?)`
                    await db.promise().query(createQuery, [
                        newRecipeId,
                        step,
                        value
                    ]);
                }
                createDirectionsData(newRecipeId, step, value);
            }
        });
    }
    async function insertRecipeDirectionData() {
        await getInsertedRecipeId();
        await directionData();
    }
    insertRecipeDirectionData();
}

module.exports = {
    createRecipe,
    createRecipePhoto,
    createRecipeIngredient,
    createRecipeDirections
}