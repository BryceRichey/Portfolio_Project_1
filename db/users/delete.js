const db = require('../../config/database');

async function deleteUserComment(commentId) {
    const deleteQuery = `
    DELETE
    FROM 
        comments 
    WHERE 
        id = ${commentId}`
        
    await db.promise().query(deleteQuery);
}

module.exports = {
    deleteUserComment
}