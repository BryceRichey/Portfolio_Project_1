import { addValidationListener } from '/javascripts/recipes/new_recipe_validation.js';

document.addEventListener('DOMContentLoaded', _e => {
    addIngredientField();
    addDirectionField();
}, false);

const addIngredientButton = document.getElementById('add-ingredient-button');
addIngredientButton.addEventListener('click', e => {
    e.preventDefault();
    addIngredientField();
});

function addIngredientField() {
    const templateElement = document.getElementById('recipe-ingredients-input-template').content;

    let ingredientInputRow = templateElement.cloneNode(true).querySelector('div');
    let allIngredientInputRows = document.querySelectorAll('#ingredient-input');
    let count = allIngredientInputRows.length;
    let ingredientInputCount = count;

    Array.from(ingredientInputRow.children).forEach(input => {
        let childName = input.children[1].name;
        let newName = `ingredients[${ingredientInputCount}][${childName}]`
        input.children[0].for = nameString(newName);
        input.children[1].name = nameString(newName);
        input.children[1].id = nameString(newName);
    });
    const appendInput = document.getElementById('ingredient-input-row');
    appendInput.append(ingredientInputRow);

    const inputs = ingredientInputRow.querySelectorAll('input, select');
    inputs.forEach(addValidationListener);
}

['delete-ingredient-button', 'delete-step-button'].forEach(button => {
    let element = document.getElementById(button);
    element.addEventListener('click', e => {
        e.preventDefault();
        deleteInput(element);
    });
});

function deleteInput(element) {
    let elementId = element.getAttribute('id');
    let ingredientRowCount = document.querySelectorAll('#ingredient-input');
    let ingredientRowLength = ingredientRowCount.length;
    let stepRowCount = document.querySelectorAll('#direction-input');
    let stepRowLength = stepRowCount.length;

    if ((elementId === 'delete-ingredient-button') && ingredientRowLength > 1) {
        const ingredientInputRows = document.getElementById('ingredient-input-row');
        let lastIngredient = ingredientInputRows.lastChild;
        lastIngredient.remove();
    } else if ((elementId === 'delete-step-button') && stepRowLength > 1) {
        const stepInputRows = document.getElementById('direction-input-row');
        let lastStep = stepInputRows.lastChild;
        lastStep.remove();
    }
}

const addDirectionButton = document.getElementById('add-direction-button');
addDirectionButton.addEventListener('click', e => {
    e.preventDefault();
    addDirectionField();
})

function addDirectionField() {
    const directionTemplateElement = document.getElementById('recipe-directions-input-template').content;

    let directionInputRow = directionTemplateElement.cloneNode(true).querySelector('div');
    let allDirectionInputRows = document.querySelectorAll('#direction-input');
    let count = allDirectionInputRows.length;
    let directionInputCount = count + 1;
    let directionInputStep = directionInputRow.children[0].children[0]
    let stepNumber = 'Step ' + directionInputCount;
    directionInputStep.textContent = stepNumber;

    Array.from(directionInputRow.children).forEach(input => {
        let childrenName = input.children[0].name;
        let newName = childrenName + directionInputCount;
        input.children[0].name = nameString(newName);
    });

    const appendInput = document.getElementById('direction-input-row');
    appendInput.append(directionInputRow);

    const inputs = directionInputRow.querySelectorAll('input');
    inputs.forEach(addValidationListener);
}

function nameString(newName) {
    return newName;
}

const ingredientButtonDiv = document.getElementById('ingredient-buttons');
const deleteIngredientButton = document.getElementById('delete-ingredient-button');
const ingredientInputRow = document.getElementById('ingredient-input-row');
const ingredientConfig = { childList: true }
const ingredientcallback = (mutationList, _observer) => {
    for (const mutation of mutationList) {
        if (mutation.type == 'childList') {
            if (deleteIngredientButton.classList.contains('not-visible')) {
                if (ingredientInputRow.children.length > 1) {
                    ingredientButtonDiv.classList.add('ingredient-buttons');
                    ingredientButtonDiv.classList.remove('single-ingredient-button');
                    deleteIngredientButton.classList.remove('not-visible');
                }
            } else {
                if (ingredientInputRow.children.length <= 1) {
                    ingredientButtonDiv.classList.remove('ingredient-buttons');
                    ingredientButtonDiv.classList.add('single-ingredient-button');
                    deleteIngredientButton.classList.add('not-visible');
                }
            }
        }
    }
}
const ingredientObserver = new MutationObserver(ingredientcallback);

ingredientObserver.observe(ingredientInputRow, ingredientConfig);

const directionButtonDiv = document.getElementById('direction-buttons');
const deleteDirectionButton = document.getElementById('delete-step-button');
const directionInputRow = document.getElementById('direction-input-row');
const directionconfig = { childList: true }
const directionCallback = (mutationList, _observer) => {
    for (const mutation of mutationList) {
        if (mutation.type == 'childList') {
            if (deleteDirectionButton.classList.contains('not-visible')) {
                if (directionInputRow.children.length > 1) {
                    directionButtonDiv.classList.add('direction-buttons');
                    directionButtonDiv.classList.remove('single-direction-button');
                    deleteDirectionButton.classList.remove('not-visible');
                }
            } else {
                if (directionInputRow.children.length <= 1) {
                    directionButtonDiv.classList.remove('direction-buttons');
                    directionButtonDiv.classList.add('single-direction-button');
                    deleteDirectionButton.classList.add('not-visible');
                }
            }
        }
    }
}
const directionObserver = new MutationObserver(directionCallback);

directionObserver.observe(directionInputRow, directionconfig);

// const photoButtonDiv = document.getElementById('photo-buttons');
// const deletePhotoButton = document.getElementById('delete-photos-button');
// const photoInputRow = document.getElementById('filesSelected');
// const photoconfig = { childList: true }
// const photoCallback = (mutationList, _observer) => {
//     for (const mutation of mutationList) {
//         console.log(mutation)
//         if (mutation.type = 'childList') {
//             if (deletePhotoButton.classList.contains('not-visible')) {
//                 if (photoInputRow.innerHTML.length > 1) {
//                     photoButtonDiv.classList.add('photo-buttons');
//                     photoButtonDiv.classList.remove('single-photo-button');
//                     deletePhotoButton.classList.remove('not-visible');
//                 }
//             } else {
//                 if (photoInputRow.innerHTML.length <= 1) {
//                     photoButtonDiv.classList.remove('photo-buttons');
//                     photoButtonDiv.classList.add('single-photo-button');
//                     deletePhotoButton.classList.add('not-visible');
//                 }
//             }
//         }
//     }
// }
// const photoObserver = new MutationObserver(photoCallback);

// photoObserver.observe(photoInputRow, photoconfig);