const db = require('../config/database');

async function getRecipe(recipe_id) {
    const query = `
    SELECT 
        r.*, 
        COUNT(DISTINCT rr.id) AS rating_count, 
        AVG(rr.rating) AS recipe_rating_avg, 
        COUNT(DISTINCT c.id) AS comments_count, 
        COUNT(DISTINCT rp.id) AS photos_count 
    FROM 
        recipes r 
    LEFT JOIN 
        recipe_ratings rr ON r.id = rr.recipe_id 
    LEFT JOIN 
        comments c ON r.id = c.recipe_id 
    LEFT JOIN 
        recipe_photos rp ON r.id = rp.recipe_id 
    WHERE 
        r.id = ? 
    GROUP BY r.id`

    const [recipe, _fields] = await db.promise().query(query, [recipe_id]);

    return recipe;
}

async function getRecipeComments(recipe_id) {
    const query = `
    SELECT 
        comments.*, 
        COUNT(l.id) AS likes 
    FROM 
        comments 
    LEFT JOIN 
        likes l ON comments.id = l.comment_id 
    WHERE 
        recipe_id = ? 
    GROUP BY 
        comments.id`

    const [comments, _fields] = await db.promise().query(query, [recipe_id]);

    return comments;
}

async function getRecipePhotos(recipe_id) {
    const query = `
    SELECT 
        * 
    FROM 
        recipe_photos rp 
    WHERE 
        rp.recipe_id = ?`

    const [photos, _fields] = await db.promise().query(query, [recipe_id]);

    return photos;
}

async function getUserRecipeCommentLikes(recipe_id, user) {
    if (!user || !user.id) return [];

    const query = `
    SELECT 
        comments.id 
    FROM 
        likes 
    LEFT JOIN 
        comments ON likes.comment_id = comments.id 
    WHERE 
        recipe_id = ? AND likes.user_id = ?`

    let [commentLikes, _fields] = await db.promise().query(query, [recipe_id, user.id]);

    commentLikes = commentLikes.map((row) => Object.values(row)[0]);

    return commentLikes;
}

async function createRecipe() {
    const insertQuery = `
    INSERT INTO 
        recipes 
    SET 
        ?`

    const [_insertRows, _insertFields] = await db.promise().query(insertQuery, {
        submit_user_id: req.user.id,
        submit_user_first_name: req.user.f_name,
        submit_user_last_name: req.user.l_name,
        r_title: req.body.r_title,
        servings: req.body.num_serv,
        prep_time: req.body.prep_time,
        cook_time: req.body.cook_time,
        description: req.body.description,
        directions: req.body.directions
    });

    const insertIdQuery = `
    SELECT 
        LAST_INSERT_ID()`

    const [insertIdRows, _insertIdFields] = await db.promise().query(insertIdQuery);

    let newRecipeId = (Object.values(insertIdRows[0]));

    const insertRecipePhotoQuery = `
    INSERT INTO 
        recipe_photos 
    SET 
        ?`

    const [_insertRecipePhotoRows, _insertRecipePhotoFields] = await db.promise().query(insertRecipePhotoQuery, {
        recipe_id: newRecipeId,
        user_id: req.user.id,
        photo_url: req.file.path
    });

    return recipe_id;
}

async function createRecipeIngredient(recipe_id, ingredientName, unitId, amount) {
    let ingredients = req.body.ingredients;
    let ingredientArray = Array();

    ingredients.forEach(ingredient => {
        ingredientArray.push([ingredient.ingredient]);
    });

    const query = `
    SELECT 
            i.ingredient
        CASE
            WHEN 
                LOWER(?) = LOWER(ingredient) 
                THEN INSERT IGNORE INTO 
                    i (ingredient) VALUES ?
            ELSE LOWER(ingredient) != LOWER(?)
                THEN INSERT INTO
                    i VALUES ?
        END
    FROM
        ingredients i`

    const [_queryRows, _queryFields] = await db.promise().query(query, [newRecipeId, ]);


    //create new recipe ingredient
}

module.exports = { getRecipe, getRecipeComments, getRecipePhotos, getUserRecipeCommentLikes, createRecipe, createRecipeIngredient };