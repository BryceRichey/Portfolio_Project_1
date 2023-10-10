const submit = document.getElementById('submit-recipe');

submit.addEventListener('click', e => {
    e.preventDefault();
    validateNewRecipe();
    // submit.submit();
});

function validateNewRecipe() {
    validateRecipeDetails('recipe-title');
    validateRecipeDetails('recipe-category');
    validateRecipeDetails('recipe-description');
    validateRecipeDetails('recipe-servings');
    validateRecipeDetails('recipe-prep-time');
    validateRecipeDetails('recipe-cook-time');
    validateRecipeDetails('ingredient-amount');
    validateRecipeDetails('ingredient-fraction');
    validateRecipeDetails('ingredient-unit');
    validateRecipeDetails('ingredient');
    validateRecipeDetails('recipeDirection');
}

function validateRecipeDetails(name) {
    const element = document.getElementById(name);
    const invalidElement = element.parentElement.querySelector('.invalid-message');
    const errorName = element.parentElement.querySelector('label').innerText;

    element.classList.remove('invalid-border');
    element.classList.add('normal-border');
    invalidElement.innerHTML = '';

    if (element.value.trim().length < 1) {
        const errorMsg = errorName + ' cannot be blank';
        invalidElement.innerHTML = errorMsg;
        element.classList.remove('normal-border');
        element.classList.add('invalid-border');
    } else {
        element.classList.remove('normal-border');
        element.classList.add('valid-border');
    }
}

const inputFields = document.querySelectorAll('input');
const selectFields = document.querySelectorAll('select');
console.log(inputFields);

function validations(inputFields, selectFields) {
    inputFields.forEach(addValidationListener);
    selectFields.forEach(addValidationListener);
}
validations(inputFields, selectFields);

export function addValidationListener(element) {
    let eventType = 'blur';
    if (element.tagName === 'SELECT') eventType = 'change';

    element.addEventListener(eventType, _e => {
        const invalidElement = element.parentElement.querySelector('.invalid-message');

        element.classList.remove('invalid-border');
        element.classList.add('normal-border');
        invalidElement.innerHTML = '';
    });
}