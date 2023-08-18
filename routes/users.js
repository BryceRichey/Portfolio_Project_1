const express = require('express');
const router = express.Router();
const db = require('../config/database');
const passport = require('../config/passport');
const session = require('express-session');
const accountQueries = require('../db/accounts')

router.get('/signup', (_req, res, _next) => {
    res.render('users/signup.ejs')
});

router.get('/signup/user/validations', (req, res, next) => {
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

//router.post('/signup', [passport.userExists, (req, res, _next) => {
router.post('/signup', (req, res, next) => {
    signup = {
        f_name: req.body.firstName,
        l_name: req.body.lastName,
        email: req.body.email
    }
    const saltHash = genPassword(req.body.password);
    const salt = saltHash.salt;
    const hash = saltHash.hash;
    db.query('INSERT INTO users(f_name, l_name, email, hash, salt, isAdmin) values(?, ?, ?, ?, ?, 0)', [...Object.values(signup), hash, salt], (err, _data, _fields) => {
        if (err) {
            console.log(err);
        } else {
            next();
        }
    });
    res.redirect('/login')
});


router.get('/login', (_req, res, _next) => {
    res.render('users/login.ejs')
});

router.get('/login/*', (req, res, _next) => {
    res.render('users/login.ejs')
    session.path = req.params[0];
});

router.post('/login', passport.passport.authenticate('local', { successRedirect: '/', failureRedirect: '/login', failureMessage: true }));


router.get('/account', passport.isAuth, async (req, res, _next) => {
    const users = await accountQueries.accountDetails(req.user.id);
    const recipes = await accountQueries.accountRecipes(req.user.id);
    const comments = await accountQueries.accountComments(req.user.id);
    res.render('users/account.ejs', { users, recipes, comments });
});

router.post('/account/contact', async (req, res, _next) => {
    for (const [key, value] of Object.entries(req.body)) {
        if (key && !value) {
            console.log('No change')
        } else if (key.includes("firstName")) {
            await accountQueries.updateFirstName(req.user, req.body);
        } else if (key.includes("lastName")) {
            await accountQueries.updateLastName(req.user, req.body);
        } else if (key.includes("email")) {
            await accountQueries.updateEmail(req.user, req.body);
        }
    }
    res.redirect('/account');
});

router.post('/account/password', async (req, res, _next) => {
    let newPassword
    let confirmPassword

    for (const [key, value] of Object.entries(req.body)) {
        if (key && !value) {
            console.log('No change')
        } else if (key.includes('confirmPassword')) {
            confirmPassword = value
        } else if (key.includes('newPassword')) {
            newPassword = value
        }        
    }

    if (newPassword != confirmPassword) {
        console.log(newPassword);
        console.log(confirmPassword);
    } else if (newPassword === confirmPassword) {
        await accountQueries.updatePassword(req.user, confirmPassword);
    }
    res.redirect('/account');
});

router.get('/account/:recipe_id/delete', async (req, res, _next) => {
    await recipeQueries.deleteRecipe(req.params.recipe_id);
    res.redirect('/account');
});

router.get('/logout', async (req, res, _next) => {
    await accountQueries.logout(req);
    res.redirect('/login');
});

module.exports = router;