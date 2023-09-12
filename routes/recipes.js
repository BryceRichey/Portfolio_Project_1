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
    const previousComment = await recipeCommentQuries.readComment(req.params.recipeId, req.user)
    const comments = await recipeQueries.getRecipeComments(req.params.recipeId);
    const commentLikes = await recipeQueries.getUserRecipeCommentLikes(req.params.recipeId, req.user);
    const photos = await recipeQueries.getRecipePhotos(req.params.recipeId);
    const recipeRating = await recipeQueries.getRecipeRatings(req.params.recipeId, req.user);


    res.render('recipes/show', {
        recipe,
        ingredients,
        directions,
        previousComment,
        comments,
        commentLikes,
        photos,
        recipeRating,
        dayjs
    });
});

// UPDATE
router.get('/recipes/:recipeId/edit', async (req, res, _next) => {
    const recipe = await recipeQueries.getRecipe(req.params.recipeId);
    const ingredients = await recipeQueries.getRecipeIngredientsAndValueNumbers(req.params.recipeId);
    const directions = await recipeQueries.getRecipeDirections(req.params.recipeId);
    // const photos = await recipeQueries.getRecipePhotos(req.params.recipeId);

    const ingredientsArray = new Array()
    let ingredientArray = new Array()
    ingredients.forEach(ingredient => {
        ingredientArray.push(ingredient.amount)
        ingredientArray.push(ingredient.fraction_value_id)
        ingredientArray.push(ingredient.unit_value_id)
        ingredientArray.push(ingredient.ingredient)
        ingredientsArray.push(ingredientArray)
        ingredientArray = []
    })

    const directionsArray = new Array()
    let directionArray = new Array()
    directions.forEach(direction => {
        directionArray.push(direction.id)
        directionArray.push(direction.direction_step)
        directionArray.push(direction.direction)
        directionsArray.push(directionArray)
        directionArray = []
    })

    res.render('recipes/edit', {
        id: req.params.recipeId,
        recipe: recipe,
        ingredients: ingredientsArray,
        directions: directions
    });
});

router.post('/recipes/:recipeId/edit', async (req, res, _next) => {
    await recipeQueries.updateRecipe(req.params.recipeId, req.body);
    // await recipeQueries.createRecipeIngredient(req.body);
    await recipeQueries.updateRecipeDirections(req.params.recipeId, req.body);

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

    if (readRating && readRating.length == 0) {
        await recipeRatingQueries.createRating(req.params.recipeId, req.user.id, req.params[0]);

        res.json({ rated: true });
    } else {
        await recipeRatingQueries.deleteRating(req.params.recipeId, req.user.id);

        res.json({ rated: false });
    }
});

module.exports = router;