const express = require('express');
const router = express.Router();
const dayjs = require('dayjs');
const passport = require('../config/passport');
const cloudinary = require('../config/cloudinary');

const recipeCreateQueries = require('../db/recipes/create');
const recipeReadQueries = require('../db/recipes/read');
const recipeUpdateQueries = require('../db/recipes/update');
const recipeDeleteQueries = require('../db/recipes/delete');

const recipeRatingQueries = require('../db/recipe_interactions/ratings');
const recipeCommentQuries = require('../db/recipe_interactions/comments');


// RECIPE CRUD
// CREATE
router.get('/recipes/new', passport.isAuth, (_req, res, _next) => {
    try {
        res.render('recipes/new');
    } catch (err) {
        console.log(err);

        res.status(404).redirect('/errors/404_generic.ejs');
    }
});

router.post('/recipes/new', cloudinary.create(), async (req, res, _next) => {
    const recipeId = await recipeCreateQueries.getRecipeId();
    await recipeCreateQueries.createRecipePhoto(req.user, req.file, recipeId);

    try {
        await recipeCreateQueries.createRecipe(req.user, req.body);
        const allIngredientsObject = recipeCreateQueries.createRecipeIngredientsObject(req.body);
        const newIngredientsArray = recipeCreateQueries.splitRecipeIngredientObject(allIngredientsObject);
        const lastInsertedRecipeId = await recipeCreateQueries.getLastInsertedRecipeId();
        await recipeCreateQueries.ingredientData(newIngredientsArray, lastInsertedRecipeId);
        const directionsArray = await recipeCreateQueries.createRecipeDirections(req.body);
        await recipeCreateQueries.splitDirectionArray(directionsArray, lastInsertedRecipeId);

        res.redirect('/recipes');
    } catch (err) {
        console.log(err)

        res.status(500).redirect('/errors/500.ejs');
    }
});


// router.post('/recipes/new', async (req, res, _next) => {
//     if (cloudinary.cloudinary === undefined) {
//         // THIS CAUSES THE BODY TO NOT BE EMPTY BUT WHEN NOT PRESENT BODY IS EMPTY
//         // cloudinary.upload.single('uploaded_file');

//         console.log(req.body);

//         const recipeId = await recipeCreateQueries.getRecipeId();

//         await recipeCreateQueries.createFakeRecipePhoto(req.user, recipeId);

//         try {
//             await recipeCreateQueries.createRecipe(req.user, req.body);
//             const allIngredientsObject = recipeCreateQueries.createRecipeIngredientsObject(req.body);
//             const newIngredientsArray = recipeCreateQueries.splitRecipeIngredientObject(allIngredientsObject);
//             const lastInsertedRecipeId = await recipeCreateQueries.getLastInsertedRecipeId();
//             await recipeCreateQueries.ingredientData(newIngredientsArray, lastInsertedRecipeId);
//             const directionsArray = await recipeCreateQueries.createRecipeDirections(req.body);
//             await recipeCreateQueries.splitDirectionArray(directionsArray, lastInsertedRecipeId);

//             res.redirect('/recipes');
//         } catch (err) {
//             console.log(err)

//             res.status(500).redirect('/errors/500.ejs');
//         }
//     } else {
//         cloudinary.upload.single('uploaded_file');

//         const recipeId = await recipeCreateQueries.getRecipeId();

//         await recipeCreateQueries.createRecipePhoto(req.user, req.file, recipeId);
//     }
// });

router.post('/recipes/search', async (req, res, _next) => {
    try {
        let searchValue = req.body.searchValue;

        const allRecipes = await recipeReadQueries.searchRecipes(req.body.searchValue);

        res.render('recipes/search', {
            allRecipes,
            searchValue
        });
    } catch (err) {
        console.log(err);

        res.status(500).redirect('/errors/505.ejs');
    }
});

// READ
router.get('/recipes', async (_req, res, _next) => {
    try {
        const allRecipes = await recipeReadQueries.getAllRecipes();

        if (allRecipes.length == 0) {
            res.status(500).render('errors/500.ejs');
        } else {
            res.render('recipes/index', {
                allRecipes
            });
        }
    } catch (err) {
        res.status(404).redirect('/errors/404_generic.ejs');
    }
});

router.get('/recipes/categories', async (req, res, _next) => {
    try {
        const categoryRecipes = await recipeReadQueries.getRecipeCategories(req.params.category);

        res.render('recipes/categories', {
            categoryRecipes
        });
    } catch (err) {
        console.log(err);

        res.status(404).redirect('/errors/404_generic.ejs');
    }
});

router.get('/recipes/categories/category=*', async (req, res, _next) => {
    try {
        const categoryRecipes = await recipeReadQueries.getCategoryRecipes(req.params[0]);

        res.json({
            categoryRecipes
        });
    } catch (err) {
        console.log(err);

        res.status(404).redirect('/errors/404_generic.ejs');
    }
});

router.get('/random-recipes', async (_req, res, _next) => {
    try {
        const randomRecipe = await recipeReadQueries.getRandomRecipe();

        let id;
        let category;

        for (const [key, value] of Object.entries(randomRecipe[0])) {
            if (key == 'id') {
                id = value
            } else if (key == 'category') {
                category = value
            }
        }

        res.redirect(`recipes/categories/${category}/${id}`);
    } catch (err) {
        console.log(err);

        res.status(404).redirect('/errors/404_no_recipe.ejs');
    }
});

router.get('/recipes/categories/:category/:recipeId', async (req, res, _next) => {
    try {
        const recipe = await recipeReadQueries.getRecipe(req.params.recipeId);
        const ingredients = await recipeReadQueries.getRecipeIngredients(req.params.recipeId);
        const directions = await recipeReadQueries.getRecipeDirections(req.params.recipeId);
        const previousComment = await recipeCommentQuries.getUserComment(req.params.recipeId, req.user)
        const comments = await recipeReadQueries.getRecipeComments(req.params.recipeId);
        const commentLikes = await recipeReadQueries.getUserRecipeCommentLikes(req.params.recipeId, req.user);
        const photos = await recipeReadQueries.getRecipePhotos(req.params.recipeId);
        const recipeRating = await recipeReadQueries.getUserRecipeRating(req.params.recipeId, req.user);

        let categoryLC = req.params.category;
        let firstLetter = categoryLC.charAt(0);
        let firstLetterCapital = firstLetter.toUpperCase();
        let remainingLetters = categoryLC.substring(1);
        let categoryUC = firstLetterCapital + remainingLetters;

        res.render('recipes/show', {
            categoryLC,
            categoryUC,
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
    } catch (err) {
        console.log(err);

        res.status(404).redirect('/errors/404_no_recipe.ejs');
    }
});

// UPDATE
router.get('/recipes/categories/:category/:recipeId/edit', passport.isAuth, async (req, res, _next) => {
    try {
        const recipe = await recipeReadQueries.getRecipe(req.params.recipeId);
        const ingredients = await recipeReadQueries.getRecipeIngredientsAndValueNumbers(req.params.recipeId);
        const directions = await recipeReadQueries.getRecipeDirections(req.params.recipeId);
        const photos = await recipeReadQueries.getRecipePhotos(req.params.recipeId);

        let categoryLC = req.params.category;
        let firstLetter = categoryLC.charAt(0);
        let firstLetterCapital = firstLetter.toUpperCase();
        let remainingLetters = categoryLC.substring(1);
        let categoryUC = firstLetterCapital + remainingLetters;

        const ingredientsArray = new Array()
        let ingredientArray = new Array()
        ingredients.forEach(ingredient => {
            ingredientArray.push(ingredient.amount);
            ingredientArray.push(ingredient.fraction);
            ingredientArray.push(ingredient.unit);
            ingredientArray.push(ingredient.fraction_value_id);
            ingredientArray.push(ingredient.unit_value_id);
            ingredientArray.push(ingredient.ingredient);
            ingredientsArray.push(ingredientArray);
            ingredientArray = [];
        })

        const directionsArray = new Array()
        let directionArray = new Array()
        directions.forEach(direction => {
            directionArray.push(direction.id);
            directionArray.push(direction.direction_step);
            directionArray.push(direction.direction);
            directionsArray.push(directionArray);
            directionArray = [];
        })

        res.render('recipes/edit', {
            categoryLC,
            categoryUC,
            id: req.params.recipeId,
            recipe: recipe,
            ingredients: ingredientsArray,
            directions: directions,
            photos
        });
    } catch (err) {
        console.log(err);

        res.status(404).redirect('/errors/404_no_recipe.ejs');
    }
});

router.post('/recipes/:recipeId/edit', async (req, res, _next) => {
    try {
        await recipeUpdateQueries.updateRecipe(req.params.recipeId, req.body);
        const currentRecipeIngredients = await recipeUpdateQueries.getRecipeIngredients(req.params.recipeId);
        const allIngredientsObject = recipeUpdateQueries.createRecipeIngredientObject(req.body);
        const splitQuarterCounter = recipeUpdateQueries.splitQuarterCounter(allIngredientsObject);
        const newIngredientsArray = recipeUpdateQueries.splitRecipeIngredientObject(allIngredientsObject, splitQuarterCounter);
        recipeUpdateQueries.checkIngredientMatch(splitQuarterCounter, currentRecipeIngredients, newIngredientsArray, req.params.recipeId);
        await recipeUpdateQueries.updateRecipeDirections(req.params.recipeId, req.body);

        res.redirect(`/recipes/categories/baking/${req.params.recipeId}`);
    } catch (err) {
        res.status(500).render('errors/500.ejs');
    }
});


// DELETE
router.get('/recipes/:recipeId/delete', passport.isAuth, async (req, res, _next) => {
    try {
        await recipeDeleteQueries.deleteRecipe(req.params.recipeId);

        res.redirect('/recipes');
    } catch (err) {
        console.log(err);

        res.status(500).render('errors/500.ejs');
    }
});

/////////
router.post('/recipes/*/:publicId/:photoId/delete', async (req, res, _next) => {
    try {
        cloudinary.destroy(req.body.publicId).then(result => {
            if (!result) return;

            let resultValue;

            for (const [key, value] of Object.entries(result)) {
                if (key == 'result') {
                    resultValue = value;
                }
            }

            if (resultValue == 'ok') {
                deletePhotoFromDB()
            }

            async function deletePhotoFromDB() {
                await recipeDeleteQueries.deletePhotos(req.params.photoId);
            }
        });
    } catch (err) {
        console.log(err);

        res.status(500).redirect('/errors/505.ejs');
    }
});


// RECIPE COMMENTS
router.post('/recipes/categories/:recipeCategory/:recipeId/comment/new', async (req, res, _next) => {
    try {
        await recipeCommentQuries.createUserComment(req.params.recipeId, req.user.id, req.user.f_name, req.user.l_name, req.body.comment);

        res.redirect(`/recipes/categories/${req.params.recipeCategory}/${req.params.recipeId}`);
    } catch (err) {
        console.log(err);

        res.status(500).render('errors/500.ejs');
    }
});

router.post('/recipes/categories/:recipeCategory/:recipeId/comment/:commentId/edit', async (req, res, _next) => {
    try {
        await recipeCommentQuries.updateUserComment(req.body.comment, req.params.commentId, req.user.id);

        res.redirect(`/recipes/categories/${req.params.recipeCategory}/${req.params.recipeId}`);
    } catch (err) {
        console.log(err);

        res.status(500).render('errors/500.ejs');
    }
});

router.get('/recipes/categories/:recipeCategory/:recipeId/comment/:commentId/delete', async (req, res, _next) => {
    try {
        await recipeCommentQuries.deleteUserComment(req.params.commentId, req.user.id);

        res.redirect(`/recipes/categories/${req.params.recipeCategory}/${req.params.recipeId}`);
    } catch (err) {
        console.log(err);

        res.status(500).render('errors/500.ejs');
    }
});


// COMMENT INTERACTIONS
router.post('/recipes/:recipeId/comment/:commentId/like', async (req, res, _next) => {
    try {
        const readLike = await recipeCommentQuries.getUserCommentLike(req.params.commentId, req.user.id);

        if (readLike && readLike.length == 0) {
            await recipeCommentQuries.createUserLike(req.params.recipeId, req.params.commentId, req.user.id);

            res.json({ liked: true });
        } else {
            await recipeCommentQuries.deleteUserLike(req.params.commentId, req.user.id);

            res.json({ liked: false });
        }
    } catch (err) {
        console.log(err);

        res.status(500).render('errors/500.ejs');
    }
});


// RECIPE RATINGS
router.post('/recipes/:recipeId/rating/ratingInt=*', async (req, res, _next) => {
    try {
        const readRating = await recipeRatingQueries.readRating(req.params.recipeId, req.user.id);

        if (readRating && readRating.length == 0) {
            await recipeRatingQueries.createRating(req.params.recipeId, req.user.id, req.params[0]);

            res.json({
                rated: true
            });
        } else {
            await recipeRatingQueries.deleteRating(req.params.recipeId, req.user.id);

            res.json({
                rated: false
            });
        }
    } catch (err) {
        console.log(err);

        res.status(500).render('errors/500.ejs');
    }
});

module.exports = router;