const express = require('express');
const router = express.Router();
const db = require('../config/database');

router.get('/recipes', (_req, res, _next) => {
    db.query('SELECT * FROM recipes ORDER BY id DESC', (err, data) => {
        if (err) {
            throw err
        } else {
            res.render('recipes/index', { recipes: data });
        }
    });
});

router.get('/recipes/new', (_req, res, _next) => {
    res.render('recipes/new');
});

router.get('/recipes/:id', (req, res, _next) => {
    db.query(`SELECT id, r_title, num_serv, ingredients, directions FROM recipes WHERE id = ${req.params.id}`, (err, data) => {
        if (err) {
            throw err
        } else {
            res.render('recipes/show', { recipe: data });
        }
    });
});

router.get('/recipes/:id/edit', (req, res, _next) => {
    db.query(`SELECT id, r_title, num_serv, ingredients, directions FROM recipes WHERE id = ${req.params.id}`, (err, data) => {
        if (err) {
            throw err
        } else {
            res.render('recipes/edit', { id: req.params.id, recipe: data });
        }
    });
});

router.post('/recipes/new', (req, res, _next) => {
    db.query(`INSERT INTO recipes SET ?`, { r_title: req.body.r_title, num_serv: req.body.num_serv, ingredients: req.body.ingredients, directions: req.body.directions }, (err, _result) => {
        if (err) {
            throw err
        } else {
            res.redirect('/recipes');
        }
    });
});

router.post('/recipes/comment/:id', (req, res, _next) => {
    db.query(`INSERT INTO comments SET ?`, { recipe_id: req.params.id, user_id: req.user.id, comment: req.body.comment }, (err, _data) => {
        if (err) {
            throw err
        } else {
            res.redirect(`/recipes/${req.params.id}`);
        }
    });
});

router.post('/recipes/:id/edit', (req, res, _next) => {
    db.query(`UPDATE recipes SET ? WHERE id = ${req.params.id}`, { r_title: req.body.r_title, num_serv: req.body.num_serv, ingredients: req.body.ingredients, directions: req.body.directions }, (err, _data) => {
        if (err) {
            throw err
        } else {
            res.redirect(`/recipes/${req.params.id}`);
        }
    });
});

router.get('/recipes/:id/delete', (req, res, _next) => {
    db.query(`DELETE FROM recipes WHERE id = ${req.params.id}`, (err, _data) => {
        if (err) {
            throw err
        } else {
            res.redirect(`/recipes`);
        }
    });
});

module.exports = router;
