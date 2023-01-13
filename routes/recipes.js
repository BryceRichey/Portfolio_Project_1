const express = require('express');
const router = express.Router();
const db = require('../database');

// Views should follow a consistent naming structure: '/views/recipes/[action].ejs'
// For example: the index view would be '/views/recipes/index.ejs'


// 'index' route
// This page displays a list of all recipes in the database
router.get('/recipes', (req, res, next) => {
    db.query('SELECT * FROM recipes ORDER BY id DESC', (err, data) => {
        if (err) {
            throw err
        } else {
            res.render('recipes/index', { recipes: data });
        }
    })
});


// 'new' route
// This page displays a page with a form to create a new recipe
// this view should probably be renamed to something like '/views/recipes/new.ejs'
router.get('/recipes/new', (req, res, next) => {
    res.render('recipes/new');
});


// 'show' route
// This page displays the information for a single recipe with id matching the URL parameter
// For example, `/recipes/10` will display the recipe with id=10
router.get('/recipes/:id', (req, res, next) => {
    res.render('recipes/show', { id: req.params.id });
});


// 'edit' route
// This page displays a form to edit a specific recipe with id matching the URL parameter
router.get('/recipes/:id/edit', (req, res, next) => {
    res.render('recipes/edit', { id: req.params.id });
});


// 'create' route
// This route accepts data from the form at '/recipes/new' and inserts it into the database
router.post('/recipes/', (req, res, next) => {
    db.query('INSERT INTO recipes SET ?', { r_title: req.body.r_title, num_serv: req.body.num_serv, ingredients: req.body.ingredients, directions: req.body.directions }, (err, result) => {
        if (err) {
            throw err
        } else
            console.log('data inserted into database');
        res.redirect('/recipes');
    })
});


// 'update' route
// This route accepts data from the form at '/recipes/:id/edit' and updates the record in the database
router.post('/recipes/:id', (req, res, next) => {
});

module.exports = router;
