const express = require('express');
const router = express.Router();
const db = require('../config/database');
const passport = require('../config/passport');

router.get('/sign_up', (req, res, next) => {
    res.render('users/sign_up.ejs')
});

router.post('/sign_up', [passport.userExists, (req, res, next) => {
    sign_up = {
        f_name: req.body.f_name,
        l_name: req.body.l_name,
        username: req.body.username,
        email: req.body.email
    }
    const saltHash = genPassword(req.body.p_word);
    const salt = saltHash.salt;
    const hash = saltHash.hash;
    db.query('INSERT INTO users(f_name, l_name, username, email, hash, salt, isAdmin) values(?, ?, ?, ?, ?, ?, 0)', [...Object.values(sign_up), hash, salt], (err, data, fileds) => {
        if (err) {
            console.log(err);
        } else {
            console.log('Successfully created an account')
        }
    });
    res.redirect('/login')
}]);

router.get('/login', (req, res, next) => {
    res.render('users/login.ejs')
});

router.post('/login', passport.passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureMessage: true
}));

// router.post('/login', (req, res, next) => {
//     const email = req.body.email;
//     const p_word = req.body.p_word;
//     db.query('SELECT * FROM users WHERE email = ? AND p_word = ?', [email, p_word], (err, data) => {
//         if (err) {
//             throw err
//         } else if (data.length > 0) {
//             req.session.loggedIn = true;
//             req.session.email = email;
//             res.redirect('/');
//         } else {
//             res.render('users/login')
//         }
//     })
// });

router.get('/logout', (req, res, next) => {
    req.logout();
    res.redirect('/login');
});

module.exports = router;