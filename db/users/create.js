const db = require('../../config/database');

async function createUser(firstName, lastName, email, salt, hash) {
    const createQuery = `
    INSERT 
    INTO 
        users
    SET
        ?`

    const [_rows, _fields] = await db.promise().query(createQuery, {
        f_name: firstName,
        l_name: lastName,
        email: email,
        hash,
        salt,
        isAdmin: 0
    });
}

module.exports = {
    createUser
}