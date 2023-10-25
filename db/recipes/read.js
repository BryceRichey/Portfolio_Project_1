const db = require('../../config/database');

async function searchRecipes(searchValue) {
    const searchQuery = `
    SELECT 
        r.*, 
        rp.photo_url,
        AVG(rr.rating) AS recipe_rating_avg
    FROM 
        recipes r
    LEFT JOIN 
        recipe_photos rp ON r.id = rp.recipe_id
    LEFT JOIN 
        recipe_ratings rr ON r.id = rr.recipe_id
    WHERE 
        MATCH (r.r_title) AGAINST ('${searchValue}') 
    GROUP BY
        r.id, rp.id
    LIMIT 
        0, 25`

    const [searchedRecipes, _fields] = await db.promise().query(searchQuery);

    return searchedRecipes;
}


async function getCategoryRecipes(category) {
    const getQuery = `
    SELECT 
        r.*, 
        rp.photo_url,
        AVG(rr.rating) AS recipe_rating_avg
    FROM 
        recipes r
    LEFT JOIN 
        recipe_photos rp ON r.id = rp.recipe_id
    LEFT JOIN 
        recipe_ratings rr ON r.id = rr.recipe_id
    WHERE 
        category = ?
    GROUP BY
		r.id, rp.id`

    const [categoryRecipes, _fields] = await db.promise().query(getQuery, [
        category
    ]);

    return categoryRecipes;
}

async function getRandomRecipe() {
    const getQuery = `
    SELECT 
        r.id, category 
    FROM 
        recipes r 
    ORDER BY RAND() 
    LIMIT 1`

    const [randomRecipe, _fields] = await db.promise().query(getQuery);

    return randomRecipe;
}

async function getAllRecipes() {
    const getQuery = `
    SELECT 
        *
    FROM 
    (
        SELECT 
            r.*, 
            rp.photo_url,
            AVG(rr.rating) AS recipe_rating_avg
        FROM 
            recipes r
        LEFT JOIN 
            recipe_photos rp ON r.id = rp.recipe_id
        LEFT JOIN 
            recipe_ratings rr ON r.id = rr.recipe_id
        GROUP BY
            r.id, rp.id
    )
    AS 
        id 
    ORDER BY 
        RAND()`

    const [allRecipes, _fields] = await db.promise().query(getQuery);

    return allRecipes;
}

async function getRecipeCategories(category) {
    const getQuery = `
    SELECT 
        r.*, 
        rp.photo_url
    FROM 
        recipes r
    LEFT JOIN 
        recipe_photos rp ON r.id = rp.recipe_id
    WHERE 
        category = ?`

    const [categoryRecipes, _fields] = await db.promise().query(getQuery,
        ['breakfast']
    );

    return categoryRecipes;
}

async function getRecipe(recipe_id) {
    const getQuery = `
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

    const [recipe, _fields] = await db.promise().query(getQuery, [
        recipe_id
    ]);

    return recipe;
}

async function getRecipeIngredients(recipe_id) {
    const getQuery = `
    SELECT 
        ri.amount,
        rf.fraction AS fraction,
        rfd.fraction_decimal AS fraction_decimal,
        ru.unit AS unit,
        i.ingredient AS ingredient
    FROM 
        recipe_ingredients ri 
    LEFT JOIN 
        recipe_fractions rf ON ri.fraction_id = rf.id
    LEFT JOIN 
		recipe_fractions rfd ON ri.fraction_id = rfd.id
    LEFT JOIN 
        recipe_units ru ON unit_id = ru.id 
    LEFT JOIN 
        ingredients i ON ingredient_id = i.id 
    WHERE 
        ri.recipe_id = ?`

    const [ingredients, _fields] = await db.promise().query(getQuery, [
        recipe_id
    ]);

    return ingredients;
}

// GETS ID OF FRACTION, UNIT, AND INGREDIENT FROM DB AND DISPLAYS THE CORRESPONDING TEXT OR VALUE OF ASSOCIATED ID
async function getRecipeIngredientsAndValueNumbers(recipeId) {
    const getQuery = `
    SELECT 
        ri.amount, fraction, unit, 
        rfv.id AS fraction_value_id,
        ru.id AS unit_value_id,
        i.ingredient AS ingredient
    FROM 
        recipe_ingredients ri 
    LEFT JOIN 
        recipe_fractions rfv ON ri.fraction_id = rfv.id
    LEFT JOIN 
        recipe_units ru ON unit_id = ru.id 
    LEFT JOIN 
        ingredients i ON ingredient_id = i.id 
    WHERE 
        ri.recipe_id = ?`

    const [ingredients, _fields] = await db.promise().query(getQuery, [
        recipeId
    ]);

    return ingredients;
}

async function getRecipeDirections(recipe_id) {
    const getQuery = `
    SELECT 
        rd.* 
    FROM 
        recipe_directions rd
    WHERE 
        rd.recipe_id = ?`

    const [directions, _fields] = await db.promise().query(getQuery, [
        recipe_id
    ]);

    return directions;
}

async function getRecipeComments(recipe_id) {
    const getQuery = `
    SELECT 
        c.*, 
        COUNT(l.id) AS likes,
        r.category AS recipe_category
    FROM 
        comments c 
    LEFT JOIN 
        likes l ON c.id = l.comment_id 
    LEFT JOIN 
		recipes r ON c.recipe_id = r.id 
    WHERE 
        recipe_id = ? 
    GROUP BY 
        c.id`

    const [comments, _fields] = await db.promise().query(getQuery, [
        recipe_id
    ]);

    return comments;
}

async function getRecipePhotos(recipe_id) {
    const getQuery = `
    SELECT 
        * 
    FROM 
        recipe_photos rp 
    WHERE 
        rp.recipe_id = ?`

    const [photos, _fields] = await db.promise().query(getQuery, [
        recipe_id
    ]);

    return photos;
}

async function getUserRecipeRating(recipeId, user) {
    if (!user || !user.id) {
        return undefined;
    } else {
        const getQuery = `
        SELECT 
            * 
        FROM 
            recipe_ratings 
        WHERE 
            recipe_id = ? 
        AND 
            user_id = ?`

        const [userRecipeRating, _fields] = await db.promise().query(getQuery, [
            recipeId,
            user.id
        ]);

        return userRecipeRating;
    }
}

async function getUserRecipeCommentLikes(recipe_id, user) {
    if (!user || !user.id) return [];

    const getQuery = `
    SELECT 
        comments.id 
    FROM 
        likes 
    LEFT JOIN 
        comments ON likes.comment_id = comments.id 
    WHERE 
        recipe_id = ? AND likes.user_id = ?`

    let [userRecipeCommentLikes, _fields] = await db.promise().query(getQuery, [
        recipe_id,
        user.id
    ]);

    userRecipeCommentLikes = userRecipeCommentLikes.map((row) => Object.values(row)[0]);

    return userRecipeCommentLikes;
}

module.exports = {
    searchRecipes,
    getCategoryRecipes,
    getRandomRecipe,
    getAllRecipes,
    getRecipeCategories,
    getRecipe,
    getRecipeIngredients,
    getRecipeIngredientsAndValueNumbers,
    getRecipeDirections,
    getRecipeComments,
    getRecipePhotos,
    getUserRecipeRating,
    getUserRecipeCommentLikes
}