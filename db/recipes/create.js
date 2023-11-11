const db = require('../../config/database');

async function createRecipe(user, body) {
    const createQuery = `
    INSERT INTO 
        recipes 
    SET 
        ?`

    await db.promise().query(createQuery, {
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

async function createRecipePhoto(user, file, recipeId) {
    if (file) {
        const createQuery = `
        INSERT INTO 
            recipe_photos 
        SET 
            ?`

        await db.promise().query(createQuery, {
            recipe_id: recipeId,
            user_id: user.id,
            photo_url: file.path,
            file_name: file.filename
        });
    }
}

async function createFakeRecipePhoto(user, recipeId) {
    const createQuery = `
        INSERT INTO 
            recipe_photos 
        SET 
            ?`

    await db.promise().query(createQuery, {
        recipe_id: recipeId,
        user_id: user.id
    });
}

async function getRecipeId() {
    const getQuery = `
        SELECT 
            id 
        FROM 
            recipes 
        ORDER BY 
            id 
        DESC LIMIT 1`

    const [recipeId, _fields] = await db.promise().query(getQuery);

    return Object.values(recipeId[0]);
}

///////////////////////////////////////////////
// BEGIN CREATE RECIPE INGREDIENTS FUNCTIONS //
///////////////////////////////////////////////

function createRecipeIngredientsObject(body) {
    let allIngredientsObject = Object.create(null);

    for (const [key, value] of Object.entries(body)) {
        if (key.includes('ingredient')) {
            allIngredientsObject[`${key}`] = `${value}`;
        }
    }

    return allIngredientsObject;
}

function splitRecipeIngredientObject(allIngredientsObject) {
    let ingredientObject = Object.create(null);
    let keyEndNumber = 1
    let splitCounter = 0
    let newIngredientsArray = []

    for (const [key, value] of Object.entries(allIngredientsObject)) {
        if (key.endsWith(keyEndNumber)) {
            ingredientObject[`${key}`] = `${value}`;
            splitCounter++;

            if (splitCounter >= 4) {
                addIngredientGroupObjectToIngredientArray(ingredientObject, newIngredientsArray)

                ingredientObject = Object.create(null);
                splitCounter = 0
                keyEndNumber++
            }
        }
    }

    return newIngredientsArray;
}

function addIngredientGroupObjectToIngredientArray(ingredientObject, newIngredientsArray) {
    newIngredientsArray.push(ingredientObject);
}

async function getLastInsertedRecipeId() {
    const getQuery = `
        SELECT 
            MAX(id) 
        FROM 
            recipes`

    const [lastInsertedRecipeId, _fields] = await db.promise().query(getQuery);

    return Object.values(lastInsertedRecipeId[0]);
}

async function ingredientData(newIngredientsArray, lastInsertedRecipeId) {
    newIngredientsArray.forEach(ingredientGroup => {
        assignIngredientDataValues(lastInsertedRecipeId, ingredientGroup);
    });
}

async function assignIngredientDataValues(lastInsertedRecipeId, ingredientGroup) {
    let amountId;
    let fractionId;
    let unitId;
    let ingredientId;

    for (const [key, value] of Object.entries(ingredientGroup)) {
        if (key.includes('ingredientAmount_')) {
            amountId = value;
        } else if (key.includes('ingredientFraction_')) {
            fractionId = value;
        } else if (key.includes('ingredientUnit_')) {
            unitId = value;
        } else if (key.includes('ingredient_')) {
            ingredientId = await checkIfIngredientExists(value);
        }
    }

    createIngredientData(lastInsertedRecipeId, amountId, fractionId, unitId, ingredientId);


}

async function checkIfIngredientExists(ingredient) {
    const getQuery = `
        SELECT 
            i.id
        FROM 
            ingredients i
        WHERE 
            i.ingredient = ?`

    const [ingredientExists, _fields] = await db.promise().query(getQuery, [
        ingredient.toLowerCase()
    ]);

    let ingredientId

    if (ingredientExists.length > 0) {
        ingredientId = ingredientExists[0].id;
    } else {
        const createQuery = `
        INSERT 
            INTO 
                ingredients (ingredient)
        VALUES 
            (?)
        ON DUPLICATE KEY UPDATE ingredient=ingredient`

        const [insertedIngredient, _fields] = await db.promise().query(createQuery, [
            ingredient.toLowerCase()
        ]);

        ingredientId = insertedIngredient.insertId;
    }

    return ingredientId;
}

async function createIngredientData(lastInsertedRecipeId, amountId, fractionId, unitId, ingredientId) {
    const createQuery = `
        INSERT INTO 
            recipe_ingredients (recipe_id, amount, fraction_id, unit_id, ingredient_id) 
        VALUES 
        (?, ?, ?, ?, ?)`

    await db.promise().query(createQuery, [
        lastInsertedRecipeId,
        amountId,
        fractionId,
        unitId,
        ingredientId
    ]);
}

/////////////////////////////////////////////
// END CREATE RECIPE INGREDIENTS FUNCTIONS //
/////////////////////////////////////////////

//////////////////////////////////////////////
// BEGIN CREATE RECIPE DIRECTIONS FUNCTIONS //
//////////////////////////////////////////////

async function createRecipeDirections(body) {
    let directions;

    for (const [key, value] of Object.entries(body)) {
        if (key.includes('recipeDirection')) {
            directions = value;
        }
    }

    return directions
}

async function splitDirectionArray(directionsArray, lastInsertedRecipeId) {
    let directionStep = 1;

    directionsArray.forEach(direction => {
        let step = directionStep++;

        createNewDirection(lastInsertedRecipeId, step, direction);
    });
}

async function createNewDirection(lastInsertedRecipeId, step, direction) {
    const createQuery = `
        INSERT INTO 
            recipe_directions (recipe_id, direction_step, direction)
        VALUES 
            (?, ?, ?)`

    await db.promise().query(createQuery, [
        lastInsertedRecipeId,
        step,
        direction
    ]);
}

////////////////////////////////////////////
// END CREATE RECIPE DIRECTIONS FUNCTIONS //
////////////////////////////////////////////

module.exports = {
    createRecipe,
    createRecipePhoto,
    createFakeRecipePhoto,
    getRecipeId,
    createRecipeIngredientsObject,
    splitRecipeIngredientObject,
    getLastInsertedRecipeId,
    ingredientData,
    createRecipeDirections,
    splitDirectionArray
}