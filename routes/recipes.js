const express = require('express');
const router = express.Router();
const db = require('../config/database');
const dayjs = require('dayjs');
const cloudinary = require('../config/cloudinary');
const recipeQueries = require('../db/recipes');


router.get('/recipes', (_req, res, _next) => {
    db.query(`SELECT * FROM recipes ORDER BY id DESC`, (err, data) => {
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

router.get('/recipes/:id', async (req, res, _next) => {
    const recipe = await recipeQueries.getRecipe(req.params.id);
    const ingredients = await recipeQueries.getRecipeIngredients(req.params.id);
    const directions = await recipeQueries.getRecipeDirections(req.params.id);
    const comments = await recipeQueries.getRecipeComments(req.params.id);
    const commentLikes = await recipeQueries.getUserRecipeCommentLikes(req.params.id, req.user);
    const photos = await recipeQueries.getRecipePhotos(req.params.id);

    res.render('recipes/show', { recipe, ingredients, directions, comments, commentLikes, photos, dayjs });
}); 

router.get('/recipes/:id/edit', (req, res, _next) => {
    db.query(`SELECT * FROM recipes WHERE id = ${req.params.id}`, (err, data) => {
        if (err) {
            throw err
        } else {
            res.render('recipes/edit', {
                id: req.params.id,
                recipe: data
            });
        }
    });
});




router.post('/recipes/new', cloudinary.upload.single('photo'), async (req, res, _next) => {
    await recipeQueries.createRecipe(req.user, req.body, req.file);
    await recipeQueries.insertRecipePhoto(req.user, req.file);
    await recipeQueries.createRecipeIngredient(req.body);
    await recipeQueries.insertRecipeDirections(req.body);

    res.redirect('/recipes');
});




router.post('/recipes/comment/:id', (req, res, _next) => {
    db.query(`INSERT INTO comments SET ?`, {
        recipe_id: req.params.id,
        user_id: req.user.id,
        first_name: req.user.f_name,
        last_name: req.user.l_name,
        comment: req.body.comment
    }, (err, _data) => {
        if (err) {
            throw err
        } else {
            res.redirect(`/recipes/${req.params.id}`);
        }
    });
});

router.post('/recipes/:recipe_id/comment/new', (req, _res, _next) => {
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
    db.query(`UPDATE comments SET ? WHERE id = ${req.params.id}`, {
        comment: req.body.comment
    }, (err, _data) => {
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

router.post('/recipes/:recipe_id/comment/like/:id', (req, res, _next) => {
    db.query(`SELECT * FROM likes WHERE comment_id = ${req.params.id} AND user_id = ${req.user.id}`, (err, data) => {
        if (err) {
            throw err
        } else if (data && data.length == 0) {
            db.query(`INSERT INTO likes SET ?`, {
                comment_id: req.params.id,
                user_id: req.user.id
            }, (err, _data) => {
                if (err) {
                    throw err
                } else {
                    res.json({ liked: true });
                }
            });
        } else {
            db.query(`DELETE FROM likes WHERE comment_id = ${req.params.id} AND user_id = ${req.user.id}`, (err, _data) => {
                if (err) {
                    throw err
                } else {
                    res.json({ liked: false });
                }
            });
        }
    });
});

router.post('/recipes/:id/rating/ratingInt=*', (req, res, _next) => {
    db.query(`SELECT * FROM recipe_ratings WHERE recipe_id = ${req.params.id} AND user_id = ${req.user.id}`, (err, data) => {
        if (err) {
            throw err
        } else if (data && data.length == 0) {
            db.query(`INSERT INTO recipe_ratings SET ?`, {
                recipe_id: req.params.id,
                user_id: req.user.id,
                rating: req.params[0]
            }, (err, _data) => {
                if (err) {
                    throw err
                } else {
                    res.json({ rated: true });
                }
            });
        } else {
            db.query(`DELETE FROM recipe_ratings WHERE recipe_id = ${req.params.id} AND user_id = ${req.user.id}`, (err, _data) => {
                if (err) {
                    throw err
                } else {
                    res.json({ rated: false });
                }
            });
        }
    });
});

router.post('/recipes/:recipe_id/edit', (req, res, _next) => {
    db.query(`UPDATE recipes SET ? WHERE id = ${req.params.id}`, {
        r_title: req.body.r_title,
        num_serv: req.body.num_serv,
        ingredients: req.body.ingredients,
        directions: req.body.directions
    }, (err, _data) => {
        if (err) {
            throw err
        } else {
            res.redirect(`/recipes/${req.params.id}`);
        }
    }
    );
});

router.get('/recipes/:recipe_id/delete', (req, res, _next) => {
    db.query(`DELETE FROM recipes WHERE id = ${req.params.id}`, (err, _data) => {
        if (err) {
            throw err
        } else {
            res.redirect(`/recipes`);
        }
    });
});

module.exports = router;
