const express = require('express');
const router = express.Router();
const db = require('../database');

// Views should follow a consistent naming structure: '/views/recipes/[action].ejs'
// For example: the index view would be '/views/recipes/index.ejs'

router.get('/recipes', (req, res, next) => {
    // 'index' route
    // This page displays a list of all recipes in the database
    
    db.query('SELECT * FROM recipes ORDER BY id DESC', (err, data) => {
        if (err) {
            throw err
        } else {
            console.log(data);
        }
    })
});

router.get('/recipes/new', (req, res, _next) => {
    // 'new' route
    // This page displays a page with a form to create a new recipe
    
    // this view should probably be renamed to something like '/views/recipes/new.ejs'
    res.render('submit_recipe');
}
           
router.get('/recipes/:id', (req, res, _next) => {
    // 'show' route
    // This page displays the information for a single recipe with id matching the URL parameter
    // For example, `/recipes/10` will display the recipe with id=10
}

router.get('/recipes/:id/edit', (req, res, _next) => {
    // 'edit' route
    // This page displays a form to edit a specific recipe with id matching the URL parameter
}
           
router.post('/recipes/', (req, res, _next) => {
    // 'create' route
    // This route accepts data from the form at '/recipes/new' and inserts it into the database
}

router.post('/recipes/:id', (req, res, _next) => {
    // 'update' route
    // This route accepts data from the form at '/recipes/:id/edit' and updates the record in the database
}

module.exports = router;
