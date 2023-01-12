const express = require('express');
const router = express.Router();
const db = require('../database');

router.get('/recipes', (req, res, next) => {
    db.query('SELECT * FROM recipes ORDER BY id DESC', (err, data) => {
        if (err) {
            throw err
        } else {
            response.render('recipes', {})
        }
    })
});