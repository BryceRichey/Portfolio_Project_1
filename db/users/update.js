const db = require('../../config/database');
const passport = require('../../config/passport')

async function updateUserFirstName(user, body) {
    const updateQuery = `
    UPDATE 
        users
    SET 
        ? 
    WHERE 
        id = ${user.id}`

    await db.promise().query(updateQuery, {
        f_name: body.firstName
    });
}

async function updateUserLastName(user, body) {
    const updateQuery = `
    UPDATE 
        users
    SET 
        ? 
    WHERE 
        id = ${user.id}`

    await db.promise().query(updateQuery, {
        l_name: body.lastName
    });
}

async function updateUserEmail(user, body) {
    const updateQuery = `
    UPDATE 
        users
    SET 
        ? 
    WHERE 
        id = ${user.id}`
        
    await db.promise().query(updateQuery, {
        email: body.email
    });
}

async function updatePassword (user, confirmPassword) {
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
    updateUserFirstName,
    updateUserLastName,
    updateUserEmail,
    updatePassword
}