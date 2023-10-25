const db = require('../../config/database');

async function createRating(recipeId, userId, rating) {
    const createQuery = `
    INSERT INTO 
        recipe_ratings 
    SET 
        ?`

    const [_creatRows, _createFields] = await db.promise().query(createQuery, {
        recipe_id: recipeId,
        user_id: userId,
        rating: rating
    });
}

async function readRating(recipeId, userId) {
    const readQuery = `
    SELECT 
        * 
    FROM 
        recipe_ratings 
    WHERE 
        recipe_id = ? 
    AND 
        user_id = ?`

    const [readRows, _readFields] = await db.promise().query(readQuery, [
        recipeId,
        userId
    ]);

    return readRows;
}

async function deleteRating(recipeId, userId) {
    const deleteQuery = `
    DELETE 
    FROM 
        recipe_ratings 
    WHERE 
        recipe_id = ? 
    AND 
        user_id = ?`

    const [_deleteRows, _deleteFields] = await db.promise().query(deleteQuery, [
        recipeId,
        userId
    ]);
}

module.exports = {
    createRating,
    readRating,
    deleteRating
}