const db = require('../config/database');
const passport = require('../config/passport');

async function accountDetails(userId) {
    const accountDetailsQuery = `
    SELECT 
        id, f_name, l_name, email
    FROM
        users 
    WHERE 
        id = ${userId}`
    const [accountData, _fields] = await db.promise().query(accountDetailsQuery);
    return accountData;
}

async function accountComments(userId) {
    const accountCommentsQuery = `
    SELECT 
        * 
    FROM 
        comments 
    WHERE 
        user_id = ${userId}`
    const [accountComments, _fields] = await db.promise().query(accountCommentsQuery);
    return accountComments;
}

async function accountRecipes(userId) {
    const accountRecipeQuery = `
    SELECT 
        id, r_title
    FROM 
        recipes
    WHERE
        submit_user_id = ${userId}`
    const [accountRecipe, _fields] = await db.promise().query(accountRecipeQuery);
    return accountRecipe;
}

async function updateFirstName(user, body) {
    const updateFirstNameQuery = `
    UPDATE 
        users
    SET 
        ? 
    WHERE 
        id = ${user.id}`
    await db.promise().query(updateFirstNameQuery, {
        f_name: body.firstName
    });
}

async function updateLastName(user, body) {
    const updateLastNameQuery = `
    UPDATE 
        users
    SET 
        ? 
    WHERE 
        id = ${user.id}`
    await db.promise().query(updateLastNameQuery, {
        l_name: body.lastName
    });
}

async function updateEmail(user, body) {
    const updateEmailQuery = `
    UPDATE 
        users
    SET 
        ? 
    WHERE 
        id = ${user.id}`
    await db.promise().query(updateEmailQuery, {
        email: body.email
    });
}

async function updatePassword(user, confirmPassword) {
    const genPassword = passport.genPassword;
    const saltHash = genPassword(confirmPassword);
    const salt = saltHash.salt;
    const hash = saltHash.hash;
    const updatePasswordQuery = `
        UPDATE 
            users
        SET 
            ? 
        WHERE 
            id = ${user.id}`
    await db.promise().query(updatePasswordQuery, {
        hash,
        salt
    });
}

async function logout(req) {
    req.logout((err) => {
        if (err) {
            console.log(err);
        }
        res.redirect('/');
    });
}

module.exports = {
    accountDetails,
    accountComments,
    accountRecipes,
    updateFirstName,
    updateLastName,
    updateEmail,
    updatePassword,
    logout
}