const db = require('../config/database');

async function readCategoryRecipe(category) {
    const readQuery = `
    SELECT 
        r.*, 
        rp.photo_url
    FROM 
        recipes r
    LEFT JOIN 
        recipe_photos rp ON r.id = rp.recipe_id
    WHERE 
        category = ?`

    const [readRows, _readFields] = await db.promise().query(readQuery, [category]);

    return readRows;
}

module.exports = {
    readCategoryRecipe
}