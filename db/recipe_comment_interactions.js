const db = require('../config/database');

async function createLike(recipeId, commentId, userId) {
    const createLike = `
        INSERT INTO 
            likes 
        SET 
            ?`

    const [_creatRows, _creatFields] = await db.promise().query(createLike, {
        recipeId: recipeId,
        comment_id: commentId,
        user_id: userId
    });
}

async function readLike(commentId, userId) {
    const readLike = `
    SELECT 
        * 
    FROM 
        likes 
    WHERE 
        comment_id = ? 
    AND 
        user_id = ?`

    const [readRows, _readFields] = await db.promise().query(readLike, [
        commentId,
        userId
    ]);

    return readRows;
}

async function deleteLike(commentId, userId) {
    const deleteQuery = `
    DELETE 
    FROM 
        likes 
    WHERE 
        comment_id = ? 
    AND 
        user_id = ?`

    const [_deleteRows, _deleteFields] = await db.promise().query(deleteQuery, [
        commentId,
        userId
    ]);
}

module.exports = {
    createLike,
    readLike,
    deleteLike
}