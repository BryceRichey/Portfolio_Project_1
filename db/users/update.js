const db = require('../../config/database');

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

module.exports = {
    updateUserFirstName,
    updateUserLastName,
    updateUserEmail
}