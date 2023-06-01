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

    const [recipe, _responseOnefields] = await db.promise().query(query, [recipe_id]);

    return recipe;
}

module.exports = { getRecipe };