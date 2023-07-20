const express = require('express');
const router = express.Router();
const db = require('../config/database');
const passport = require('../config/passport');

router.get('/sign_up', (req, res, next) => {
    res.render('users/sign_up.ejs')
});

router.get('/sign_up/user/validations', (req, res, _next) => {
    const username = req.query.username
    const email = req.query.email

    if (username) {
        db.query(`SELECT username FROM users WHERE username = '${username}'`, (err, data) => {
            if (!(data && data.length) || err) {
                res.json({
                    username: true
                }).end();
            } else {
                res.json({
                    username: false
                }).end();
            }
        });
    } else if (email) {
        db.query(`SELECT email FROM users WHERE email = '${email}'`, (err, data) => {
            if (!(data && data.length) || err) {
                res.json({
                    email: true
                }).end();
            } else {
                res.json({
                    email: false
                }).end();
            }
        });
    }
});

router.post('/sign_up', [passport.userExists, (req, res, next) => {
    sign_up = {
        f_name: req.body.f_name,
        l_name: req.body.l_name,
        username: req.body.username,
        email: req.body.email
    }
    const saltHash = genPassword(req.body.password);
    const salt = saltHash.salt;
    const hash = saltHash.hash;
    db.query('INSERT INTO users(f_name, l_name, username, email, hash, salt, isAdmin) values(?, ?, ?, ?, ?, ?, 0)', [...Object.values(sign_up), hash, salt], (err, data, fields) => {
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
    console.log(req.session);
    console.log(req.user);
});

router.post('/login', passport.passport.authenticate('local', { successRedirect: '/', failureRedirect: '/login', failureMessage: true }));

router.get('/account', passport.isAuth, (req, res, next) => {
    db.query(`SELECT id, f_name, l_name, username, email FROM users WHERE id = ${req.user.id}`, (err, data) => {
        if (err) {
            throw err
        } else {
            res.render('users/account.ejs', { users: data });
        }
    })
});

router.post('/account/new_names', (req, res, next) => {
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

router.get('/logout', (req, res, next) => {
    req.logout((err) => {
        if (err) {
            console.log(err)
        }
        res.redirect('/')
    });
    res.redirect('/login');
});

module.exports = router;