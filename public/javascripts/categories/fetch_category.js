const categories = document.getElementById('categories-container').querySelectorAll('li')

categories && categories.forEach((category) => {
    category.addEventListener('click', e => {
        getSelectedCategory(e.target);
    });
});

function getSelectedCategory(categoryType) {
    const url = categoryType.dataset.url;
    const category = categoryType.dataset.category;
    const newCategory = document.getElementById(`${category}-category-container`);
    const oldCategory = document.getElementsByClassName('active-category-link')[0];

    oldCategory.classList.remove('active-category-link');
    oldCategory.classList.add('inactive-category-link');
    categoryType.classList.remove('inactive-category-link');
    categoryType.classList.add('active-category-link');

    let oldCategoryContainerArray = document.querySelectorAll('[id$="-category-container"]');

    oldCategoryContainerArray.forEach(item => {
        if (item.id.startsWith(category)) {
            item.classList.remove('not-visible');
        } else {
            item.classList.add('not-visible');
        }
    });

    if (!newCategory) {
        fetch(url + new URLSearchParams({
            category
        }), {
            method: 'GET'
        }).then((response) => response.json()).then((data) => {
            const main = document.getElementById('category-recipe-all-cards');
            const section = document.createElement('section');
            const noRecipesSection = document.getElementById('no-category-container');
            const section2 = document.createElement('section');

            for (const [_key, value] of Object.entries(data)) {
                if (value.length === 0) {
                    const noRecipeP = document.createElement('p');

                    if (noRecipesSection) {
                        const section2Container = document.getElementById('no-category-container');

                        section2Container.classList.remove('not-visible');
                    } else {
                        section2.classList.add('no-category-container');
                        section2.setAttribute('id', 'no-category-container');
                        noRecipeP.innerHTML = 'No Recipes In This Category'
                        noRecipeP.classList.add('button-muted');

                        section2.append(noRecipeP);
                        main.append(section2);
                    }
                } else {
                    value.forEach(recipe => {
                        const template = document.getElementById('recipe_card_template').content;
                        const clone = template.cloneNode(true);
                        const a = clone.getElementById('category-recipe-card');
                        const photoDiv = clone.getElementById('category-recipe-photo');
                        const ratingDiv = clone.getElementById('recipe-rating');

                        section.setAttribute('id', `${recipe['category']}-category-container`);
                        section.classList.add(`${recipe['category']}-category-container`);

                        a.setAttribute('href', `/recipes/categories/${recipe['category']}/${recipe['id']}`);
                        a.setAttribute('data-recipe-name', `${recipe['r_title']}`);
                        a.setAttribute('data-recipe-id', `${recipe['id']}`);
                        a.setAttribute('data-recipe-created-at', `${recipe['created_at']}`);
                        
                        const recipeRating = parseInt(recipe['recipe_rating_avg']);
                        
                        a.setAttribute('data-recipe-rating', `${recipeRating}`);

                        if (isNaN(recipeRating)) {
                            ratingDiv.innerHTML = "Not Rated";
                        } else {
                            ratingDiv.innerHTML = parseFloat(recipe['recipe_rating_avg']).toFixed(1);
                        }

                        checkPhotoURL(recipe, photoDiv);
                        setRecipeTitle(clone, recipe);

                        section.append(clone);
                        main.append(section);
                    });
                }
            }
        });
    }
}

function checkPhotoURL(recipe, photoDiv) {
    if (recipe['photo_url']) {
        const img = document.createElement('img');

        img.setAttribute('src', recipe['photo_url']);

        photoDiv.append(img);
    } else {
        const div = document.createElement('div');
        const p = document.createElement('p');

        div.classList.add('no-photo-wrapper');
        p.innerHTML = 'No Photo';
        div.append(p);
        photoDiv.append(div);
    }
}

function setRecipeTitle(clone, recipe) {
    const recipeTitle = clone.getElementById('recipe-title');
    const p2 = clone.getElementById('recipe-submitter');

    recipeTitle.innerHTML = recipe['r_title'].charAt(0).toUpperCase() + recipe['r_title'].slice(1);
    p2.innerHTML = 'By: ' + recipe['submit_user_first_name'];
}