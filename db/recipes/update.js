const db = require('../../config/database');

async function updateRecipe(recipeId, body) {
    const updateQuery = `
    UPDATE 
        recipes 
    SET 
        ? 
    WHERE 
        id = ${recipeId}`

    const [_rows, _fields] = await db.promise().query(updateQuery, {
        r_title: body.recipeTitle,
        description: body.recipeDescription,
        servings: body.recipeServings,
        prep_time: body.recipePrepTime,
        cook_time: body.recipeCookTime,
        category: body.recipeCategory
    });
}

async function updateRecipePhoto(user, file, recipeId) {
    if (file) {
        const getQuery = `
        SELECT 
            rp.id 
        FROM 
            recipe_photos rp 
        WHERE 
            id = ${recipeId}`

        const [getRecipeId, _fields] = await db.promise().query(getQuery);

        if (!getRecipeId.length) {
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
        } else {
            const updateQuery = `
            UPDATE
                recipe_photos 
            SET 
                ? 
            WHERE 
                id = ${recipeId}`

            await db.promise().query(updateQuery, {
                recipe_id: recipeId,
                user_id: user.id,
                photo_url: file.path,
                file_name: file.filename
            });
        }
    }
}

///////////////////////////////////////////////
// BEGIN UPDATE RECIPE INGREDIENTS FUNCTIONS //
///////////////////////////////////////////////
async function updateRecipeIngredients(submittedIngredients, recipe_id) {
    const oldIngredientData = await getOldIngredientsData(recipe_id);

    let ingredientChecks = []
    let oldIngredientsLength = oldIngredientData.length;
    let newIngredientsLength = submittedIngredients.length;
    let count = 0;
    let stepCount = 1;

    submittedIngredients.forEach(async (ingredient) => {
        const promise = checkIngredientExists(ingredient['name']);
        ingredientChecks.push(promise);

        ingredient['name'] = await promise.then(res => (res));
    });

    await Promise.all(ingredientChecks);

    if (newIngredientsLength === oldIngredientsLength) {
        for (const ingredient of submittedIngredients) {
            await updateRecipeIngredient(ingredient['amount'], ingredient['fraction'], ingredient['unit'], ingredient['name'], oldIngredientData[count]);

            count++;
        }
    }

    if (newIngredientsLength > oldIngredientsLength) {
        for (const ingredient of submittedIngredients) {
            if (stepCount <= oldIngredientsLength) {
                await updateRecipeIngredient(ingredient['amount'], ingredient['fraction'], ingredient['unit'], ingredient['name'], oldIngredientData[count]);

                stepCount++;
            } else {
                await insertRecipeIngredient(recipe_id, ingredient['amount'], ingredient['fraction'], ingredient['unit'], ingredient['name']);
            }

            count++;
        }
    }

    if (newIngredientsLength < oldIngredientsLength) {

        if (stepCount <= newIngredientsLength) {
            console.log(count);
            for (const ingredient of submittedIngredients) {
                await updateRecipeIngredient(ingredient['amount'], ingredient['fraction'], ingredient['unit'], ingredient['name'], oldIngredientData[count]);

                stepCount++;
                count++;
            }
        }

        if (stepCount <= oldIngredientsLength) {
            for (let i = count; i <= oldIngredientsLength; i++) {
                console.log("DELETE");
                console.log(count);

                await deleteRecipeIngredient(oldIngredientData[count]);

                stepCount++;
                count++;
            }
        }
    }
}

async function getOldIngredientsData(recipe_id) {
    const getQuery = `
    SELECT 
        ri.id
    FROM
        recipe_ingredients ri
    WHERE 
        ri.recipe_id = ?`

    const [oldIngredientIds, _fields] = await db.promise().query(getQuery, [recipe_id]);

    let oldIdArray = [];

    oldIngredientIds.forEach((data) => {
        for (const [_key, value] of Object.entries(data)) {
            oldIdArray.push(value);
        }
    });

    return oldIdArray;
}

async function checkIngredientExists(ingredient) {
    const getQuery = `
    SELECT 
        i.id 
    FROM 
        ingredients i
    WHERE 
        i.ingredient = ?`
    const [ingredientId, _fields] = await db.promise().query(getQuery, [ingredient]);

    if (ingredientId.length > 0) {
        for (const [_key, value] of Object.entries(ingredientId[0])) {
            return value;
        }
    } else {
        await insertIngredient(ingredient);
        return await lastInsertId(ingredient);
    }
}

async function insertIngredient(ingredient) {
    const insertQuery = `
    INSERT IGNORE INTO
        ingredients
    SET 
        ?`

    await db.promise().query(insertQuery, {
        ingredient: ingredient
    });
}

async function lastInsertId(ingredient) {
    const selectQuery = `
    SELECT 
        i.id
    FROM 
        ingredients i
    WHERE 
        i.ingredient = ?`

    const [ingredientId, _fields] = await db.promise().query(selectQuery, [ingredient]);

    if (ingredientId.length > 0) {
        for (const [_key, value] of Object.entries(ingredientId[0])) {
            return value;
        }
    }
}

async function updateRecipeIngredient(amountId, fractionId, unitId, name, ingredientDataID) {
    const updateQuery = `
        UPDATE 
            recipe_ingredients 
        SET 
            ?
        WHERE 
            id = ${ingredientDataID}`

    await db.promise().query(updateQuery, {
        amount: amountId,
        fraction_id: fractionId,
        unit_id: unitId,
        ingredient_id: name
    });
}

async function insertRecipeIngredient(recipeId, amountId, fractionId, unitId, name) {
    const insertQuery = `
    INSERT INTO 
        recipe_ingredients 
    SET 
        ?`

    await db.promise().query(insertQuery, {
        recipe_id: recipeId,
        amount: amountId,
        fraction_id: fractionId,
        unit_id: unitId,
        ingredient_id: name
    });
}

async function deleteRecipeIngredient(id) {
    const deleteQuery = `
    DELETE 
    FROM 
        recipe_ingredients ri
    WHERE 
        ri.id = ?`

    await db.promise().query(deleteQuery, [id]);
}

/////////////////////////////////////////////
// END UPDATE RECIPE INGREDIENTS FUNCTIONS //
/////////////////////////////////////////////

//////////////////////////////////////////////
// BEGIN UPDATE RECIPE DIRECTIONS FUNCTIONS //
//////////////////////////////////////////////
async function updateRecipeDirections(recipeId, body) {
    const deleteQuery = `
    DELETE 
    FROM 
        recipe_directions 
    WHERE 
        recipe_id = ?`

    await db.promise().query(deleteQuery, [recipeId]);

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
// END UPDATE RECIPE DIRECTIONS FUNCTIONS //
////////////////////////////////////////////

module.exports = {
    updateRecipe,
    updateRecipePhoto,
    updateRecipeIngredients,
    updateRecipeDirections,
    splitDirectionArray
}