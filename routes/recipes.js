const express = require('express');
const router = express.Router();
const dayjs = require('dayjs');
const passport = require('../config/passport');
const cloudinary = require('../config/cloudinary');
const recipeQueries = require('../db/recipes');
const recipeCommentQuries = require('../db/recipe_comments');
const recipeCommentInteractionQueries = require('../db/recipe_comment_interactions');
const recipeRatingQueries = require('../db/recipe_ratings');


// RECIPE CRUD
// CREATE
router.get('/recipes/new', (_req, res, _next) => {
    res.render('recipes/new');
});

router.post('/recipes/new', cloudinary.upload.single('photo'), async (req, res, _next) => {
    await recipeQueries.createRecipe(req.user, req.body, req.file);
    await recipeQueries.insertRecipePhoto(req.user, req.file);
    await recipeQueries.createRecipeIngredient(req.body);
    await recipeQueries.insertRecipeDirections(req.body);

    res.redirect('/recipes');
});

// READ
router.get('/recipes', async (_req, res, _next) => {
    const recipes = await recipeQueries.getAllRecipes();

    res.render('recipes/index', { recipes })
});

router.get('/recipes/:recipeId', async (req, res, _next) => {
    const recipe = await recipeQueries.getRecipe(req.params.recipeId);
    const ingredients = await recipeQueries.getRecipeIngredients(req.params.recipeId);
    const directions = await recipeQueries.getRecipeDirections(req.params.recipeId);
    const comments = await recipeQueries.getRecipeComments(req.params.recipeId);
    const commentLikes = await recipeQueries.getUserRecipeCommentLikes(req.params.recipeId, req.user);
    const photos = await recipeQueries.getRecipePhotos(req.params.recipeId);
    const recipeRating = await recipeQueries.getRecipeRatings(req.params.recipeId, req.user);


    res.render('recipes/show', {
        recipe,
        ingredients,
        directions,
        comments,
        commentLikes,
        photos,
        recipeRating,
        dayjs
    });
});

// UPDATE
router.get('/recipes/:recipeId/edit', async (req, res, _next) => {
    const data = await recipeQueries.readEditRecipe(req.params.recipeId);

    res.render('recipes/edit', {
        id: req.params.recipeId,
        recipe: data
    });
});

router.post('/recipes/:recipeId/edit', async (req, res, _next) => {
    await recipeQueries.updateRecipe(req.params.recipeId, req.body.r_title, req.body.num_serv, req.body.ingredients, req.body.directions);

    res.redirect(`/recipes/${req.params.recipeId}`);
});

// DELETE
router.get('/recipes/:recipeId/delete', async (req, res, _next) => {
    await recipeQueries.deleteRecipe(req.params.recipeId);

    res.redirect('/recipes');
});


// RECIPE COMMENTS
router.post('/recipes/:recipeId/comment/new', async (req, res, _next) => {
    await recipeCommentQuries.createComment(req.params.recipeId, req.user.id, req.user.f_name, req.user.l_name, req.body.comment);

    res.redirect(`/recipes/${req.params.recipeId}`);
});

router.post('/recipes/:recipeId/comment/:commentId/edit', async (req, res, _next) => {
    await recipeCommentQuries.updateComment(req.body.comment, req.params.commentId, req.user.id);

    res.redirect(`/recipes/${req.params.recipeId}`);
});

router.get('/recipes/:recipeId/comment/:commentId/delete', async (req, res, _next) => {
    await recipeCommentQuries.deleteComment(req.params.commentId, req.user.id);

    res.redirect(`/recipes/${req.params.recipeId}`);
});


// COMMENT INTERACTIONS
router.post('/recipes/:recipeId/comment/:commentId/like', async (req, res, _next) => {
    const readLike = await recipeCommentInteractionQueries.readLike(req.params.commentId, req.user.id);

    if (readLike && readLike.length == 0) {
        await recipeCommentInteractionQueries.createLike(req.params.commentId, req.user.id);

        res.json({ liked: true });
    } else {
        await recipeCommentInteractionQueries.deleteLike(req.params.commentId, req.user.id);

        res.json({ liked: false });
    }
});


// RECIPE RATINGS
router.post('/recipes/:recipeId/rating/ratingInt=*', async (req, res, _next) => {
    const readRating = await recipeRatingQueries.readRating(req.params.recipeId, req.user.id);

    console.log(readRating)

    if (readRating && readRating.length == 0) {
        await recipeRatingQueries.createRating(req.params.recipeId, req.user.id, req.params[0]);

        res.json({ rated: true });
    } else {
        await recipeRatingQueries.deleteRating(req.params.recipeId, req.user.id);

        res.json({ rated: false });
    }
});

module.exports = router;