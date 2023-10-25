const db = require('../../config/database');

async function deleteRecipe(recipeId) {
    const deleteRecipePhotosQuery = `
    DELETE
    FROM 
        recipe_photos 
    WHERE 
        recipe_id = ${recipeId}`
    await db.promise().query(deleteRecipePhotosQuery);

    const deleteRecipeLikesQuery = `
    DELETE
    FROM 
        likes 
    WHERE 
        recipeId = ${recipeId}`
    await db.promise().query(deleteRecipeLikesQuery);

    const deleteRecipeRatingsQuery = `
        DELETE
        FROM 
            recipe_ratings 
        WHERE 
            recipe_id = ${recipeId}`
    await db.promise().query(deleteRecipeRatingsQuery);

    const deleteRecipeDirectionsQuery = `
        DELETE
        FROM 
            recipe_directions 
        WHERE 
            recipe_id = ${recipeId}`
    await db.promise().query(deleteRecipeDirectionsQuery);

    const deleteRecipeIngredientsQuery = `
        DELETE
        FROM 
            recipe_ingredients 
        WHERE 
            recipe_id = ${recipeId}`
    await db.promise().query(deleteRecipeIngredientsQuery);

    const deleteRecipeCommentsQuery = `
        DELETE
        FROM 
            comments 
        WHERE 
            recipe_id = ${recipeId}`
    await db.promise().query(deleteRecipeCommentsQuery);

    const deleteRecipeQuery = `
    DELETE 
    FROM 
        recipes 
    WHERE 
        id = ${recipeId}`
    await db.promise().query(deleteRecipeQuery);
}

async function deletePhotos(photoId) {
    const deleteQuery = `
    DELETE 
    FROM 
        recipe_photos 
    WHERE 
        id = ${photoId}`
    await db.promise().query(deleteQuery);
}

module.exports = {
    deleteRecipe,
    deletePhotos
}