require('dotenv').config();

const mysql2 = require('mysql2');

const db = mysql2.createPool({
    host: process.env.DATABASE_URL || 'localhost',
    user: process.env.DATABASE_USER || 'root',
    database: process.env.DATABASE_NAME || 'project_1',
    port: '3306',
    password: process.env.DB_PASS,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

module.exports = db;