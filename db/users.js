const db = require('../config/database');
const passport = require('../config/passport');

async function createUser(firstName, lastName, email, salt, hash) {
    const createQuery = `
    INSERT 
    INTO 
        users
    SET
        ?`

    const [_creatRows, _creatFields] = await db.promise().query(createQuery, {
        f_name: firstName,
        l_name: lastName,
        email: email,
        hash,
        salt,
        isAdmin: 0
    });
}


async function readDetails(userId) {
    const userDetailsQuery = `
    SELECT 
        id, f_name, l_name, email
    FROM
        users 
    WHERE 
        id = ${userId}`
    const [userData, _fields] = await db.promise().query(userDetailsQuery);

    return userData;
}

async function readRecipes(userId) {
    const userRecipeQuery = `
    SELECT 
        id, r_title, category
    FROM 
        recipes
    WHERE
        submit_user_id = ${userId}`
    const [userRecipe, _fields] = await db.promise().query(userRecipeQuery);

    return userRecipe;
}

async function readComments(userId) {
    const userCommentsQuery = `
    SELECT 
        * 
    FROM 
        comments 
    WHERE 
        user_id = ${userId}`
    const [userComments, _fields] = await db.promise().query(userCommentsQuery);

    return userComments;
}

async function readEmail(email) {
    const readQuery = `
    SELECT 
        email 
    FROM 
        users 
    WHERE 
        email = ?`

    const [readRows, _readFields] = await db.promise().query(readQuery, [
        email
    ]);

    return readRows;
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

module.exports = {
    createUser,
    readDetails,
    readComments,
    readRecipes,
    readEmail,
    updateFirstName,
    updateLastName,
    updateEmail,
    updatePassword
}