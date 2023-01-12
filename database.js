const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '8NE-4qb-fzq-qGA',
    database: 'project_1',
    port: '3306'
})

db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Connected to MySQL Server!');
});

module.exports = db;