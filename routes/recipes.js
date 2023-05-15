const express = require('express');
const router = express.Router();
const db = require('../config/database');
const dayjs = require('dayjs');
const cloudinary = require('../config/cloudinary');


router.get('/recipes', (_req, res, _next) => {
    db.query(`SELECT * FROM recipes ORDER BY id DESC`, (err, data) => {
        if (err) {
            throw err
        } else {
            console.log()
            res.render('recipes/index', { recipes: data });
        }
    });
});

router.get('/recipes/new', (_req, res, _next) => {
    res.render('recipes/new');
});

router.get('/recipes/:id', async (req, res, _next) => {
    const recipeShowPage = async () => {
        const queryOne = `SELECT r.*, COUNT(DISTINCT rr.id) AS rating_count, COUNT(DISTINCT c.id) AS comments_count, COUNT(DISTINCT rp.id) AS photos_count FROM recipes r LEFT JOIN recipe_ratings rr ON r.id = rr.recipe_id LEFT JOIN comments c ON r.id = c.recipe_id LEFT JOIN recipe_photos rp ON r.id = rp.recipe_id WHERE r.id = ${req.params.id} GROUP BY r.id`
        const queryTwo = `SELECT comments.*, COUNT(l.id) AS likes FROM comments LEFT JOIN likes l ON comments.id = l.comment_id WHERE recipe_id = ${req.params.id} GROUP BY comments.id`
        const queryThree = `SELECT * FROM likes LEFT JOIN comments ON likes.user_id = comments.user_id WHERE recipe_id = ${req.params.id} and likes.user_id = ${req.user.id}`
        const queryFour = `SELECT * FROM recipe_photos rp WHERE rp.recipe_id = ${req.params.id}`

        const [reponseOneRows, responseOnefields] = await db.promise().query(queryOne);
        const [reponseTwoRows, responseTwofields] = await db.promise().query(queryTwo);
        const [reponseThreeRows, responseThreefields] = await db.promise().query(queryThree);
        const [responseFourRows, responseFourFields] = await db.promise().query(queryFour);

        return { recipe: reponseOneRows, comments: reponseTwoRows, commentLikes: reponseThreeRows, photos: responseFourRows }
    }

    const { recipe: recipe, comments: comments, commentLikes: commentLikes, photos: photos } = await recipeShowPage();

    res.render('recipes/show', { recipe, comments, commentLikes, photos, dayjs });
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
    const postNewRecipe = async () => {
        const queryOne = `INSERT INTO recipes SET ?`
        const queryTwo = `SELECT LAST_INSERT_ID()`
        const queryThree = `INSERT INTO recipe_photos SET ?`

        const [_reponseOneRows, _responseOnefields] = await db.promise().query(queryOne, {
            submit_user_id: req.user.id,
            submit_user_first_name: req.user.f_name,
            submit_user_last_name: req.user.l_name,
            r_title: req.body.r_title,
            servings: req.body.num_serv,
            prep_time: req.body.prep_time,
            cook_time: req.body.cook_time,
            description: req.body.description,
            ingredients: req.body.ingredients,
            directions: req.body.directions
        });
        const [reponseTwoRows, _responseTwofields] = await db.promise().query(queryTwo);
        const newRecipeId = (Object.values(reponseTwoRows[0]));
        const [_reponseThreeRows, _responseThreefields] = await db.promise().query(queryThree, {
            recipe_id: newRecipeId,
            user_id: req.user.id,
            photo_url: req.file.path
        });
    }

    await postNewRecipe();

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
