const express = require('express');
const router = express.Router();
const db = require('../database');

router.get('/recipes', (req, res, next) => {
    db.query('SELECT * FROM recipes ORDER BY id DESC', (err, data) => {
        if (err) {
            throw err
        } else {
            console.log(data);
        }
    })
});

router.get('/recipes', (req, res) => {
    res.render('recipes')
});

router.get('/submit_recipe', (req, res) => {
    res.render('submit_recipe')
});
router.post('/submit_recipe', (req, res, next) => {
    db.query('INSERT INTO recipes SET ?', { r_title: req.body.r_title, num_serv: req.body.num_serv, ingredients: req.body.ingredients, directions: req.body.directions }, (err, result) => {
        if (err) {
            throw err
        } else
            console.log('data inserted into database');
        res.redirect('/recipes');
    })
});

router.get('/login', (req, res) => {
    res.render('login')
});

router.get('/sign_up', (req, res) => {
    res.render('sign_up')
});
router.post('/sign_up', (req, res, next) => {
    db.query('INSERT INTO login SET ?', { f_name: req.body.f_name, l_name: req.body.l_name, email: req.body.email, p_word: req.body.p_word }, (err, result) => {
        if (err) {
            throw err;
        } else
            console.log('data inserted into database');
        res.redirect('/');
    })
});

module.exports = router;