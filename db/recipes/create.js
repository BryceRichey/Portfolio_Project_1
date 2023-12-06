const db = require('../../config/database');

async function createRecipe(user, body) {
    const createQuery = `
    INSERT INTO 
        recipes 
    SET 
        ?`

    const [insertedRecipe, _fields] = await db.promise().query(createQuery, {
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

    return insertedRecipe.insertId;
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

///////////////////////////////////////////////
// BEGIN CREATE RECIPE INGREDIENTS FUNCTIONS //
///////////////////////////////////////////////

async function createRecipeIngredients(ingredientsArray, recipe_id) {
    let ingredientChecks = [];

    ingredientsArray.forEach(async (ingredient) => {
        const promise = checkIfIngredientExists(ingredient['name']);
        ingredientChecks.push(promise);

        ingredient['ingredient_id'] = await promise.then(res => (res));
    });

    await Promise.all(ingredientChecks);

    for (const ingredient of ingredientsArray) {
        await insertRecipeIngredient(recipe_id, ingredient['amount'], ingredient['fraction'], ingredient['unit'], ingredient['ingredient_id']);
    }
}

function checkIfIngredientExists(ingredient) {
    const getQuery = `
        SELECT 
            i.id
        FROM 
            ingredients i
        WHERE 
            i.ingredient = ?`

    return db.promise().query(getQuery, [
        ingredient.toLowerCase()
    ]).then((results) => {
        if (results[0].length > 0) return results[0][0].id;

        const createQuery = `
            INSERT 
                INTO 
                    ingredients (ingredient)
            VALUES 
                (?)
            ON DUPLICATE KEY UPDATE ingredient=ingredient`

        return db.promise().query(createQuery, [
            ingredient.toLowerCase()
        ]).then((results) => {
            return results[0].insertId;
        });
    });
}

async function insertRecipeIngredient(recipe_id, amountId, fractionId, unitId, ingredientId) {
    const insertQuery = `
        INSERT INTO 
            recipe_ingredients (recipe_id, amount, fraction_id, unit_id, ingredient_id) 
        VALUES 
        (?, ?, ?, ?, ?)`

    await db.promise().query(insertQuery, [
        recipe_id,
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
    let directions = [];

    for (const [key, value] of Object.entries(body)) {
        if (key.includes('recipeDirection')) {
            directions.push(value);
        }
    }

    return directions
}

async function splitDirectionArray(directionsArray, recipeId) {
    let directionStep = 1;

    directionsArray.forEach(direction => {
        let step = directionStep++;

        createNewDirection(recipeId, step, direction);
    });
}

async function createNewDirection(recipeId, step, direction) {
    const createQuery = `
        INSERT INTO 
            recipe_directions (recipe_id, direction_step, direction)
        VALUES 
            (?, ?, ?)`

    await db.promise().query(createQuery, [
        recipeId,
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
    createRecipeIngredients,
    createRecipeDirections,
    splitDirectionArray
} 