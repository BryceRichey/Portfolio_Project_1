const express = require('express');
const router = express.Router();
const db = require('../config/database');
const passport = require('../config/passport');
const session = require('express-session');

router.get('/signup', (_req, res, _next) => {
    res.render('users/signup.ejs')
});

router.get('/signup/user/validations', (req, res, _next) => {
    const email = Object.values(req.query)[0]
    db.query(`SELECT email FROM users WHERE email = "${email}"`, (err, data) => {
        if (!(data && data.length) || err) {
            res.json({
                email: 'true'
            }).end();
        } else {
            res.json({
                email: 'false'
            }).end();
        }
    });
});

router.post('/signup', [passport.userExists, (req, res, _next) => {
    signup = {
        f_name: req.body.firstName,
        l_name: req.body.lastName,
        username: req.body.username,
        email: req.body.email
    }
    const saltHash = genPassword(req.body.password);
    const salt = saltHash.salt;
    const hash = saltHash.hash;
    db.query('INSERT INTO users(f_name, l_name, username, email, hash, salt, isAdmin) values(?, ?, ?, ?, ?, ?, 0)', [...Object.values(signup), hash, salt], (err, _data, _fields) => {
        if (err) {
            console.log(err);
        } else {
            res.redirect('/');
        }
    });
    res.redirect('/')
}]);


router.get('/login', (_req, res, _next) => {
    res.render('users/login.ejs')
});

router.get('/login/*', (req, res, _next) => {
    res.render('users/login.ejs')
    session.path = req.params[0];
});

router.post('/login', passport.passport.authenticate('local', { successRedirect: '/', failureRedirect: '/login', failureMessage: true }));


router.get('/account', passport.isAuth, (req, res, _next) => {
    db.query(`SELECT id, f_name, l_name, username, email FROM users WHERE id = ${req.user.id}`, (err, data) => {
        if (err) {
            throw err
        } else {
            res.render('users/account.ejs', { users: data });
        }
    })
});

router.post('/account/new_names', (req, res, _next) => {
    if (req.body.f_name != "" && req.body.l_name != "" && req.body.username != "") {
        db.query(`UPDATE users SET ? WHERE id = ${req.user.id}`, { f_name: req.body.f_name, l_name: req.body.l_name, username: req.body.username }, (err, data) => {
            if (err) {
                throw err
            } else {
                res.redirect('/account');
            }
        });
    }
});

router.post('/account/change_email', (req, res, next) => {
    if (req.body.newEmail === req.body.confirmEmail) {
        db.query(`UPDATE users SET ? WHERE id = ${req.user.id}`, { email: req.body.confirmEmail }, (err, data) => {
            if (err) {
                throw err
            } else {
                res.redirect('/account');
            }
        });
    }
});

// router.post('/account/change_password', [passport.genPassword, (req, res, next) => {
//     const saltHash = genPassword(req.body.confirmPassword);
//     const salt = saltHash.salt;
//     const hash = saltHash.hash;
//     db.query(`UPDATE users SET ? WHERE id = ${req.user.id}`, {hash, salt}, (err, data, fields) => {
//         if (err) {
//             throw err
//         } else {
//             res.redirect('/account');
//         }
//     })
// }
// ])

router.get('/logout', (req, res, _next) => {
    req.logout((err) => {
        if (err) {
            console.log(err)
        }
        res.redirect('/')
    });
    res.redirect('/login');
});

module.exports = router;