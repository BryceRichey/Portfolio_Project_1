const express = require('express');
const router = express.Router();
const passport = require('../config/passport');
const userQueries = require('../db/users');
const recipeQueries = require('../db/recipes');


// CRUD
// CREATE
router.post('/signup', async (req, res, _next) => {
    const saltHash = genPassword(req.body.password);
    const salt = saltHash.salt;
    const hash = saltHash.hash;

    await userQueries.createUser(req.body.firstName, req.body.lastName, req.body.email, salt, hash);

    res.redirect('/login');
});

// READ
router.get('/signup', (_req, res, _next) => {
    try {
        res.render('users/signup.ejs');
    } catch (err) {
        console.log(err);

        res.status(500).redirect('/errors/500.ejs');
    }
});

router.get('/account', passport.isAuth, async (req, res, _next) => {
    try {
        const users = await userQueries.readDetails(req.user.id);
        const recipes = await userQueries.readRecipes(req.user.id);
        const comments = await userQueries.readComments(req.user.id);

        res.render('users/account.ejs', { users, recipes, comments });
    } catch (err) {
        console.log(err);

        res.status(500).redirect('/errors/500.ejs');
    }
});

router.get('/signup/user/validations', async (req, res, _next) => {
    try {
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
    } catch (err) {
        console.log(err);

        res.status(500).redirect('/errors/500.ejs');
    }
});

// UPDATE
router.post('/account/contact', async (req, res, _next) => {
    try {
        for (const [key, value] of Object.entries(req.body)) {
            if (key && !value) {
                console.log('No change');
            } else if (key.includes("firstName")) {
                await userQueries.updateFirstName(req.user, req.body);
            } else if (key.includes("lastName")) {
                await userQueries.updateLastName(req.user, req.body);
            } else if (key.includes("email")) {
                await userQueries.updateEmail(req.user, req.body);
            }
        }

        res.redirect('/account');
    } catch (err) {
        console.log(err);

        res.status(500).redirect('/errors/500.ejs');
    }
});

router.post('/account/password', async (req, res, _next) => {
    try {
        let newPassword;
        let confirmPassword;

        for (const [key, value] of Object.entries(req.body)) {
            if (key && !value) {
                console.log('No change');
            } else if (key.includes('confirmPassword')) {
                confirmPassword = value;
            } else if (key.includes('newPassword')) {
                newPassword = value;
            }
        }

        if (newPassword != confirmPassword) {
            console.log(newPassword);
            console.log(confirmPassword);
        } else if (newPassword === confirmPassword) {
            await userQueries.updatePassword(req.user, confirmPassword);
        }
        res.redirect('/account');
    } catch (err) {
        console.log(err);

        res.status(500).redirect('/errors/500.ejs');
    }
});


// DELETE
router.get('/account/:recipe_id/delete', async (req, res, _next) => {
    try {
        await recipeQueries.deleteRecipe(req.params.recipe_id);

        res.redirect('/account');
    } catch (err) {
        console.log(err);

        res.status(500).redirect('/errors/500.ejs');
    }
});


// LOGIN & LOGOUT 
router.get('/login', (req, res, _next) => {
    try {
        const flashMessage = req.flash('IncorrectMessage');

        if (flashMessage != 0) {
            res.render('users/login.ejs', {
                message: flashMessage[0]
            });
        } else {
            res.render('users/login.ejs', {
                message: null
            });
        }
    } catch (err) {
        console.log(err);

        res.status(500).redirect('/errors/500.ejs');
    }
});

router.post('/login',
    passport.passport.authenticate('local', {
        failureRedirect: '/login',
        failureFlash: true,
        keepSessionInfo: true
    })
    , (req, res) => {
        try {
            const template = req.session.passport;
            const returnTo = req.session.returnTo;

            req.session.regenerate(
                function (_err) {
                    req.session.passport = template;
                    req.session.returnTo = returnTo;
                    req.session.save(
                        function (_err) {
                            res.sendStatus(200);
                        }
                    );
                }
            );

            if (req.session.returnTo == undefined) {
                res.redirect('/');
            } else {
                res.redirect(req.session.returnTo);
            }
        } catch (err) {
            console.log(err);

            res.status(500).redirect('/errors/500.ejs');
        }
    }
);

router.get('/logout', (req, res, _next) => {
    try {
        req.logout((err) => {
            if (err) {
                console.log(err);
            }
            res.redirect('/');
        });

        res.redirect('/login');
    } catch (err) {
        console.log(err);

        res.status(500).redirect('/errors/500.ejs');
    }
});

module.exports = router;