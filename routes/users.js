const express = require('express');
const session = require('express-session');
const router = express.Router();
const app = require('../app');
const db = require('../config/database');
const passport = require('../config/passport');


router.get('/sign_up', (req, res, next) => {
    res.render('users/sign_up.ejs')
});

router.post('/sign_up', (req, res, next) => {
    sign_up = {
        f_name: req.body.f_name,
        l_name: req.body.l_name,
        u_name: req.body.u_name,
        email: req.body.email,
        p_word: req.body.p_word
    }
    const saltHash = genPassword(req.body.p_word);
    const salt = saltHash.salt;
    const hash = saltHash.hash;
    db.query('INSERT INTO users(u_name, has, salt, isAdmin) values(?, ?, ?, 0)', [req.body.u_name, hash, salt], (err, data, fileds) => {
        if (err) {
            console.log(err);
        } else {
            console.log('Successfully created an account')
        }
    });
    res.redirect('/login')
});

// router.post('/sign_up', (req, res, next) => {
//     sign_up = {
//         f_name: req.body.f_name,
//         l_name: req.body.l_name,
//         u_name: req.body.u_name,
//         email: req.body.email,
//         p_word: req.body.p_word
//     }
//     db.query('SELECT * FROM users WHERE email = ?', [sign_up.email], (err, data) => {
//         if (err) {
//             throw err
//         } if (data.length > 1) {
//             msg = 'An account with' + sign_up.email + 'already exists!'
//         } else {
//             db.query('INSERT INTO users SET ?', sign_up, (err, data) => {
//                 if (err) {
//                     throw err
//                 } else {
//                     msg = 'Account created successfully'
//                 }
//                 res.redirect('/login')
//             })
//         }
//     })
// });

router.get('/login', (req, res, next) => {
    res.render('users/login.ejs')
});

router.post('/login', (req, res, next) => {
    const email = req.body.email;
    const p_word = req.body.p_word;
    db.query('SELECT * FROM users WHERE email = ? AND p_word = ?', [email, p_word], (err, data) => {
        if (err) {
            throw err
        } else if (data.length > 0) {
            req.session.loggedIn = true;
            req.session.email = email;
            res.redirect('/');
        } else {
            res.render('users/login')
        }
    })
});

router.get('/logout', (req, res, next) => {
    req.logout();
    res.redirect('/login');
});

module.exports = router;