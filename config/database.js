require('dotenv').config();

const mysql2 = require('mysql2');

const db = mysql2.createPool({
    host: 'localhost',
    user: 'root',
    database: 'project_1',
    port: '3306',
    password: process.env.DB_SECRET,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

module.exports = db;