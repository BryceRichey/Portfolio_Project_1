const db = require('../config/database');

async function readCategoryRecipe(category) {
    const readQuery = `
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

    const [readRows, _readFields] = await db.promise().query(readQuery, [category]);

    return readRows;
}

async function randomRecipe() {
    const readQuery = `
    SELECT 
        r.id, category 
    FROM 
        recipes r 
    ORDER BY RAND() 
    LIMIT 1`

    const [readRows, _readFields ] = await db.promise().query(readQuery);

    return readRows
}
module.exports = {
    readCategoryRecipe,
    randomRecipe
}