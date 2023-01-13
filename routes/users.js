const express = require('express');
const router = express.Router();
const db = require('../database');

router.get('/login', (req, res, next) => {
    res.render('users/login')
});

router.get('/sign_up', (req, res, next) => {
    res.render('users/sign_up')
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