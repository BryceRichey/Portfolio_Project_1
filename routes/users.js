const express = require('express');
const router = express.Router();
const passport = require('../config/passport');
const session = require('express-session');
const userQueries = require('../db/users');
const recipeQueries = require('../db/recipes');


// CRUD
// CREATE
//router.post('/signup', [passport.userExists, (req, res, _next) => {
router.post('/signup', async (req, res, _next) => {
    const saltHash = genPassword(req.body.password);
    const salt = saltHash.salt;
    const hash = saltHash.hash;

    await userQueries.createUser(req.body.firstName, req.body.lastName, req.body.email, salt, hash);
    
    res.redirect('/login')
});

// READ
router.get('/signup', (_req, res, _next) => {
    res.render('users/signup.ejs')
});

router.get('/account', passport.isAuth, async (req, res, _next) => {
    const users = await userQueries.readDetails(req.user.id);
    const recipes = await userQueries.readRecipes(req.user.id);
    const comments = await userQueries.readComments(req.user.id);
    res.render('users/account.ejs', { users, recipes, comments });
});

router.get('/signup/user/validations', async (req, res, _next) => {
    const email = Object.values(req.query);
    const data = await userQueries.readEmail(email);

    if (!(data && data.length)) {
        res.json({
            email: 'true'
        });
    } else {
        res.json({
            email: 'false'
        });
    }
});

// UPDATE
router.post('/account/contact', async (req, res, _next) => {
    for (const [key, value] of Object.entries(req.body)) {
        if (key && !value) {
            console.log('No change')
        } else if (key.includes("firstName")) {
            await userQueries.updateFirstName(req.user, req.body);
        } else if (key.includes("lastName")) {
            await userQueries.updateLastName(req.user, req.body);
        } else if (key.includes("email")) {
            await userQueries.updateEmail(req.user, req.body);
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
        await userQueries.updatePassword(req.user, confirmPassword);
    }
    res.redirect('/account');
});

// DELETE
router.get('/account/:recipe_id/delete', async (req, res, _next) => {
    await recipeQueries.deleteRecipe(req.params.recipe_id);
    res.redirect('/account');
});


// LOGIN & LOGOUT 
router.get('/login', (_req, res, _next) => {
    res.render('users/login.ejs')
});

router.get('/login/*', (req, res, _next) => {
    res.render('users/login.ejs')
    session.path = req.params[0];
});

router.post('/login', passport.passport.authenticate('local', {
    successReturnToOrRedirect: '/',
    failureRedirect: '/login'
}));

router.get('/logout', (req, res, _next) => {
    req.logout((err) => {
        if (err) {
            console.log(err);
        }
        res.redirect('/');
    });
    
    res.redirect('/login');
});

module.exports = router;