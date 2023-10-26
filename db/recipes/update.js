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
        cook_time: body.recipeCookTime
    });
}

///////////////////////////////////////////////
// BEGIN UPDATE RECIPE INGREDIENTS FUNCTIONS //
///////////////////////////////////////////////

async function getRecipeIngredients(recipeId) {
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

    const [currentRecipeIngredients, _fields] = await db.promise().query(getQuery, [
        recipeId
    ]);

    return currentRecipeIngredients;
}

function createRecipeIngredientObject(body) {
    let allIngredientsObject = Object.create(null);
    let addKeyValueCounter = 0;

    for (const [key, value] of Object.entries(body)) {
        if (key.includes('ingredient')) {
            allIngredientsObject[`${key}`] = `${value}`;
            addKeyValueCounter++
        }
    }

    return allIngredientsObject;
}

// SPLITQUARTERCOUNT ENSURES AN INGREDIENTS AMOUNT, FRACTION, AND UNIT ARE GROUPED TOGETHER
function splitQuarterCounter(allIngredientsObject) {
    return Object.keys(allIngredientsObject).length / 4;
}

function splitRecipeIngredientObject(allIngredientsObject, splitQuarterCounter) {
    let ingredientObject = Object.create(null);

    let splitCounter = 0;
    let newIngredientsArray = [];

    for (const [key, value] of Object.entries(allIngredientsObject)) {
        for (let i = 0; i <= splitQuarterCounter; i++) {
            if (key.endsWith('_' + i)) {
                ingredientObject[`${key}`] = `${value}`;
                splitCounter++;

                if (splitCounter >= 4) {
                    addIngredientGroupObjectToIngredientArray(ingredientObject, newIngredientsArray);

                    ingredientObject = Object.create(null);
                    splitCounter = 0;
                    i++
                }
            }
        }
    }

    return newIngredientsArray;
}

function addIngredientGroupObjectToIngredientArray(ingredientObject, newIngredientsArray) {
    let newIngredientObject = ingredientObject;

    newIngredientsArray.push(newIngredientObject);
}

function checkIngredientMatch(splitQuarterCounter, currentRecipeIngredients, newIngredientsArray, recipeId) {
    if (splitQuarterCounter < currentRecipeIngredients.length) {
        for (let i = splitQuarterCounter; i < currentRecipeIngredients.length; i++) {
            let deleteCurrentIngredient = currentRecipeIngredients[i];

            Object.entries(deleteCurrentIngredient).forEach(([key, value]) => {
                if (key == "id") {
                    deleteIngredient(value);
                }
            });
        }
    } else {
        for (let i = 0; i < newIngredientsArray.length; i++) {
            let newIngredientGroup = newIngredientsArray[i];
            let currentIngredientGroup = currentRecipeIngredients[i];

            getNewIngredientValue(recipeId, newIngredientGroup, currentIngredientGroup);
        }
    }
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

function getNewIngredientValue(recipeId, newIngredientGroup, currentIngredientGroup) {
    let newAmount;
    let newFraction;
    let newUnit;
    let newIngredient;
    let counter = 0;

    for (const [key, value] of Object.entries(newIngredientGroup)) {
        if (key.includes('ingredientAmount_')) {
            newAmount = value;
            counter++
        } else if (key.includes('ingredientFraction_')) {
            newFraction = value;
            counter++
        } else if (key.includes('ingredientUnit_')) {
            newUnit = value;
            counter++
        } else if (key.includes('ingredient_')) {
            newIngredient = value;
            counter++
        }

        if (counter >= 4) {
            getCurrentIngredientValue(recipeId, newAmount, newFraction, newUnit, newIngredient, currentIngredientGroup);

            counter = 0;
        }
    }
}

async function getCurrentIngredientValue(recipeId, newAmount, newFraction, newUnit, newIngredient, currentIngredientGroup) {
    let id;
    let currentAmount;
    let currentFraction;
    let currentUnit;
    let currentIngredient;
    let counter = 0;

    if (currentIngredientGroup != undefined) {
        for (const [key, value] of Object.entries(currentIngredientGroup)) {
            if (key == 'id') {
                id = value
                counter++
            } else if (key.includes('amount')) {
                currentAmount = value;
                counter++
            } else if (key.includes('fraction_id')) {
                currentFraction = value;
                counter++
            } else if (key.includes('unit_id')) {
                currentUnit = value;
                counter++
            } else if (key.includes('ingredient')) {
                currentIngredient = value;
                counter++
            }

            if (counter >= 5) {
                checkIfIngredientChange(id, recipeId, currentAmount, currentFraction, currentUnit, currentIngredient, newAmount, newFraction, newUnit, newIngredient);

                counter = 0;
            }
        }
    } else {
        let newIngredientId = await getIngredientId(newIngredient);

        insertNewIngredient(recipeId, newAmount, newFraction, newUnit, newIngredientId);
    }
}

async function checkIfIngredientChange(id, recipeId, currentAmount, currentFraction, currentUnit, _currentIngredient, newAmount, newFraction, newUnit, newIngredient) {
    let updateAmount;
    let updateFraction;
    let updateUnit;

    if (newAmount == currentAmount) {
        updateAmount = currentAmount;
    } else if (newAmount != currentAmount) {
        updateAmount = newAmount;
    }

    if (newFraction == currentFraction) {
        updateFraction = currentFraction;
    } else if (newFraction != currentFraction) {
        updateFraction = newFraction;
    }

    if (newUnit == currentUnit) {
        updateUnit = currentUnit;
    } else if (newUnit != currentUnit) {
        updateUnit = newUnit;
    }

    let lowerCaseIngredient = newIngredient.toLowerCase();
    let newIngredientId = await getIngredientId(lowerCaseIngredient);
    // let updateIngredient = newIngredientId;

    updateNewIngredient(id, recipeId, updateAmount, updateFraction, updateUnit, newIngredientId);

    delete updateAmount;
    delete updateFraction;
    delete updateUnit;
    delete newIngredientId;
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

async function updateNewIngredient(id, recipeId, updateAmount, updateFraction, updateUnit, newIngredientId) {
    const updateQuery = `
    UPDATE 
        recipe_ingredients 
    SET 
        ?
    WHERE 
        id = ${id}`
    const [_rows, _fields] = await db.promise().query(updateQuery, {
        recipe_id: recipeId,
        amount: updateAmount,
        fraction_id: updateFraction,
        unit_id: updateUnit,
        ingredient_id: newIngredientId
    });
}

async function getIngredientId(newIngredient) {
    const getQuery = `
    SELECT 
        id 
    FROM 
        ingredients 
    WHERE 
        ingredient = ?`

    const [newIngredientId, _fields] = await db.promise().query(getQuery, [newIngredient]);

    if (newIngredientId.length > 0) {
        for (const [_key, value] of Object.entries(newIngredientId[0])) {
            return value;
        }
    } else {
        let newIngredientId = await insertNewIngredient(newIngredient);

        return newIngredientId;
    }
}

async function insertNewIngredient(newIngredient) {
    const createQuery = `
    INSERT INTO 
        ingredients 
    SET 
        ?`

    await db.promise().query(createQuery, {
        ingredient: newIngredient
    });

    const getQuery = `
    SELECT 
        MAX(id) 
    FROM 
        ingredients`

    const [newIngredientId, _fields] = await db.promise().query(getQuery);

    for (const [key, value] of Object.entries(newIngredientId[0])) {
        if (key == 'MAX(id)') {
            let id = value;

            return id;
        }
    }
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

    let directionsObject = Object.create(null);
    let directionsArray = [];

    for (const [key, value] of Object.entries(body)) {
        if (key.includes('recipeDirection')) {
            directionsObject[`${key}`] = `${value}`;
            directionsArray.push(directionsObject);
            directionsObject = Object.create(null);
        }
    }

    splitDirectionArray(directionsArray, recipeId);
}

async function splitDirectionArray(directionsArray, recipeId) {
    let directionStep = 1;

    directionsArray.forEach(direction => {
        for (const [_key, value] of Object.entries(direction)) {
            let step = directionStep++;

            createNewDirection(recipeId, step, value);
        }
    });
}

async function createNewDirection(recipeId, step, value) {
    const insertQuery = `
        INSERT INTO 
            recipe_directions (recipe_id, direction_step, direction)
        VALUES
            (?, ?, ?)`

    await db.promise().query(insertQuery, [
        recipeId,
        step,
        value
    ]);
}

////////////////////////////////////////////
// END UPDATE RECIPE DIRECTIONS FUNCTIONS //
////////////////////////////////////////////

module.exports = {
    updateRecipe,
    getRecipeIngredients,
    createRecipeIngredientObject,
    splitQuarterCounter,
    splitRecipeIngredientObject,
    checkIngredientMatch,
    updateRecipeDirections
}