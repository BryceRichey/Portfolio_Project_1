const express = require('express');
const router = express.Router();
const db = require('../config/database');
const dayjs = require('dayjs');

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

router.get('/recipes/:id', (req, res, next) => {
    db.query(`SELECT r.*, COUNT(c.id) AS comments_count FROM recipes r LEFT JOIN comments c ON r.id = c.recipe_id WHERE r.id = ${req.params.id} GROUP BY r.id`, (err, recipeData) => {
        if (err) {
            throw err
        } db.query(`SELECT * FROM comments WHERE recipe_id = ${req.params.id}`, (err, commentData) => {
            if (err) {
                throw err
            } else {
                res.render('recipes/show', { recipe: recipeData, comments: commentData, dayjs: dayjs });
            }
        });
    });
});

router.get('/recipes/:id/edit', (req, res, _next) => {
    db.query(`SELECT * FROM recipes WHERE id = ${req.params.id}`, (err, data) => {
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
    db.query(`INSERT INTO comments SET ?`, { recipe_id: req.params.id, user_id: req.user.id, first_name: req.user.f_name, last_name: req.user.l_name, comment: req.body.comment }, (err, _data) => {
        if (err) {
            throw err
        } else {
            res.redirect(`/recipes/${req.params.id}`);
        }
    });
});

// router.get('/recipes/:id/comment/new', (req, res, _next) => {
//     db.query(`SELECT * FROM comments WHERE recipe_id = ${req.params.id} AND user_id = ${req.user.id}`, (err, data) => {
//         if (err) {
//             throw err
//         } else if (!data || []) {
//             console.log(req.params.id);
//             console.log('Working');
//             res.sendFile(__dirname + './public/javacripts/comments.js', err => console.log(err));
//         } else {
//             alert('Sorry but you have already made a comment');
//         }
//     })
// });

router.post('/recipes/:recipe_id/comment/new', (req, res, _next) => {
    db.query(`SELECT * FROM comments WHERE user_id = ${req.user.id}`, (err, data) => {
        if (err) {
            throw err
        } else if (data) {
            alert('Sorry but you have already made a comment');
        } else {
            
        }
    })
});

router.post('/recipes/:recipe_id/comment/edit/:id', (req, res, _next) => {
    db.query(`UPDATE comments SET ? WHERE id = ${req.params.id}`, { comment: req.body.comment }, (err, _data) => {
        if (err) {
            throw err
        } else {
            res.redirect(`/recipes/${req.params.recipe_id}`);
        }
    });
});

router.get('/recipes/:recipe_id/comment/delete/:id', (req, res, _next) => {
    db.query(`DELETE FROM comments WHERE id = ${req.params.id}`, (err, _data) => {
        if (err) {
            throw err
        } else {
            res.redirect(`/recipes/${req.params.recipe_id}`);
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
