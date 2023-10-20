const filterSelect = document.getElementById('category-select-filter').querySelectorAll('option');

filterSelect && filterSelect.forEach(filter => {
    filter.addEventListener('click', e => {
        filterConent(e.target);
    });
});

function filterConent(option) {
    let filterOption = option.value;


    const activeCategorySection = document.querySelectorAll(`[id$="-category-container"]`)

    activeCategorySection.forEach(section => {
        const checkClass = section.classList;

        if (checkClass.contains('not-visible')) {
        } else {
            const sectionChildren = section.children;
            const sectionArray = new Array();

            for (const [_key, value] of Object.entries(sectionChildren)) {
                sectionArray.push(value);
            }

            if (filterOption == 'alphabetical') {
                sectionArray.sort(function (a, b) {
                    const nameA = a.dataset.recipeName.toLowerCase();
                    const nameB = b.dataset.recipeName.toLowerCase();

                    return (nameA < nameB) ? -1 : (nameA > nameB) ? 1 : 0;
                });

                reorderDOMElements();
            } else if (filterOption == 'newest') {
                sectionArray.sort(function (a, b) {
                    const nameA = a.dataset.recipeCreatedAt;
                    const nameB = b.dataset.recipeCreatedAt;

                    return (nameA < nameB) ? 1 : (nameA > nameB) ? -1 : 0;
                });

                reorderDOMElements();
            } else if (filterOption == 'oldest') {
                sectionArray.sort(function (a, b) {
                    const nameA = a.dataset.recipeCreatedAt;
                    const nameB = b.dataset.recipeCreatedAt;

                    return (nameA < nameB) ? -1 : (nameA > nameB) ? 1 : 0;
                });

                reorderDOMElements();
            } else if (filterOption == 'highest_rated') {
                sectionArray.sort(function (a, b) {
                    const nameA = a.dataset.recipeRating;
                    const nameB = b.dataset.recipeRating;
                    
                    return nameB - nameA;
                });

                reorderDOMElements();
            } else if (filterOption == 'lowest_rated') {
                sectionArray.sort(function (a, b) {
                    const nameA = a.dataset.recipeRating;
                    const nameB = b.dataset.recipeRating;

                    return nameA - nameB;
                });

                reorderDOMElements();
            }

            function reorderDOMElements() {
                for (let i = 0; i < sectionArray.length; i++) {
                    section.append(sectionArray[i]);
                }
            }
        }
    });
}