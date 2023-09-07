const db = require('../config/database');

async function createComment(recipeId, userId, firstName, lastName, comment) {
    const createQuery = `
    INSERT INTO 
        comments 
    SET 
        ?`

    const [_createRecipeCommentRows, _createRecipeCommentFields] = await db.promise().query(createQuery, {
       recipe_id: recipeId,
       user_id: userId,
       first_name: firstName,
       last_name: lastName,
       comment: comment
    });
}

async function readComment(recipeId) {
    const readQuery = `
    SELECT 
        * 
    FROM 
        comments 
    WHERE 
        user_id = ?`
    
    const [rows, _fields] = await db.promise().query(readQuery, [recipeId]);

    if (rows && rows.lenght == 0) {
        return false
    } else {
        return true
    }
}

async function updateComment(comment, commentId, userId) {
    const updateQuery = `
    UPDATE 
        comments 
    SET 
        ? 
    WHERE 
        id = ${commentId}
    AND 
        user_id = ${userId}`
    
    const [_updateRows, _updateFields] = await db.promise().query(updateQuery, {
        comment: comment
    });
}

async function deleteComment(commentId, userId) {
    const deleteQuery = `
    DELETE 
    FROM 
        comments 
    WHERE 
        id = ?
    AND 
        user_id = ?`
    
    const [_deleteRows, _deleteFields] = await db.promise().query(deleteQuery, [commentId, userId]);
}

module.exports = { 
    createComment, 
    readComment, 
    updateComment, 
    deleteComment 
}