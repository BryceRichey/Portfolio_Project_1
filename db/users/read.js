const db = require('../../config/database');

async function getUserData(userId) {
    const getQuery = `
    SELECT 
        id, f_name, l_name, email
    FROM
        users 
    WHERE 
        id = ${userId}`
    const [userData, _fields] = await db.promise().query(getQuery);

    return userData;
}

async function getUserRecipes(userId) {
    const getQuery = `
    SELECT 
        id, r_title, category
    FROM 
        recipes
    WHERE
        submit_user_id = ${userId}`
    const [userRecipe, _fields] = await db.promise().query(getQuery);

    return userRecipe;
}

async function getUserComments(userId) {
    const getQuery = `
    SELECT 
        c.*,
        r.category AS 'category' 
    FROM 
        comments c 
    LEFT JOIN 
        recipes r ON r.id = c.recipe_id 
    WHERE 
        user_id = ${userId}`
    const [userComments, _fields] = await db.promise().query(getQuery);

    return userComments;
}

async function getUserEmail(email) {
    const getQuery = `
    SELECT 
        email 
    FROM 
        users 
    WHERE 
        email = ?`

    const [userEmail, _fields] = await db.promise().query(getQuery, [
        email
    ]);

    return userEmail;
}

module.exports = {
    getUserData,
    getUserRecipes,
    getUserComments,
    getUserEmail
}