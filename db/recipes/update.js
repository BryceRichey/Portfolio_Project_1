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

    const [recipeIngredients, _fields] = await db.promise().query(getQuery, [
        recipeId
    ]);

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
                    let newIngredientObject = ingredientObject;
                    ingredientsArray.push(newIngredientObject);
                    counter = 0;
                    ingredientObject = Object.create(null);
                    i++
                }
            }
        }

        let ingredientData = ingredientsArray;

        function checkIngredientMatch(recipeId, ingredientData, recipeIngredients) {
            if (quarterCounter < recipeIngredients.length) {
                for (let i = quarterCounter; i < recipeIngredients.length; i++) {
                    let deleteRow = recipeIngredients[i];

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
                    let getRow = recipeIngredients[i];

                    getNewIngredientValue(
                        recipeId,
                        newIngredient,
                        getRow
                    );
                }
            }

            function getNewIngredientValue(recipeId, newIngredient, getRow) {
                let amountNew;
                let fractionNew;
                let unitNew;
                let ingredientNew;
                let count = 0;

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
        checkIngredientMatch(recipeId, ingredientData, recipeIngredients);
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
    let directionsArray = [];

    for (const [key, value] of Object.entries(body)) {
        if (key.includes('recipeDirection')) {
            allDirectionsObject[`${key}`] = `${value}`;
            directionsArray.push(allDirectionsObject);
            allDirectionsObject = Object.create(null);
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

                    await db.promise().query(insertQuery, [
                        recipeId,
                        step,
                        value
                    ]);
                }
                insertDirectionData(recipeId, step, value);
            }
        });
    }
    directionData();
}

module.exports = {
    updateRecipe,
    updateRecipeIngredients,
    updateRecipeDirections
}