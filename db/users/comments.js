const db = require('../../config/database');

async function createUserComment(recipeId, userId, firstName, lastName, comment) {
    const createQuery = `
    INSERT INTO 
        comments 
    SET 
        ?`

    const [_rows, _fields] = await db.promise().query(createQuery, {
        recipe_id: recipeId,
        user_id: userId,
        first_name: firstName,
        last_name: lastName,
        comment: comment
    });
}

async function createUserLike(recipeId, commentId, userId) {
    const createQuery = `
        INSERT INTO 
            likes 
        SET 
            ?`

    const [_rows, _fields] = await db.promise().query(createQuery, {
        recipeId: recipeId,
        comment_id: commentId,
        user_id: userId
    });
}

async function getUserComment(recipeId, user) {
    if (user != undefined) {
        const getQuery = `
        SELECT 
            * 
        FROM 
            comments 
        WHERE 
            user_id = ?
        AND 
            recipe_id = ?`

        const [userComment, _fields] = await db.promise().query(getQuery, [
            user.id, 
            recipeId
        ]);

        if (userComment.length === 1) {
            return 'user commented'
        } else {
            return 'not commented'
        }
    }
}

async function getUserCommentLike(commentId, userId) {
    const getQuery = `
    SELECT 
        * 
    FROM 
        likes 
    WHERE 
        comment_id = ? 
    AND 
        user_id = ?`

    const [userCommentLike, _fields] = await db.promise().query(getQuery, [
        commentId,
        userId
    ]);

    return userCommentLike;
}

async function updateUserComment(comment, commentId, userId) {
    const updateQuery = `
    UPDATE 
        comments 
    SET 
        ? 
    WHERE 
        id = ${commentId}
    AND 
        user_id = ${userId}`

    const [_rows, _fields] = await db.promise().query(updateQuery, {
        comment: comment
    });
}

async function deleteUserComment(commentId, userId) {
    const deleteQuery = `
    DELETE 
    FROM 
        comments 
    WHERE 
        id = ?
    AND 
        user_id = ?`

    const [_rows, _fields] = await db.promise().query(deleteQuery, [
        commentId, 
        userId
    ]);
}

async function deleteUserLike(commentId, userId) {
    const deleteQuery = `
    DELETE 
    FROM 
        likes 
    WHERE 
        comment_id = ? 
    AND 
        user_id = ?`

    const [_rows, _fields] = await db.promise().query(deleteQuery, [
        commentId,
        userId
    ]);
}

module.exports = {
    createUserComment,
    createUserLike,
    getUserComment,
    getUserCommentLike,
    updateUserComment,
    deleteUserComment,
    deleteUserLike
}