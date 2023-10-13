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
    let ingredientInputCount = count + 1;
    let inputChildren = ingredientInputRow.children[0].children;

    Array.from(inputChildren).forEach(input => {
        childrenName = input.children[1].name;
        let newName = childrenName + ingredientInputCount;
        input.children[1].name = nameString(newName);
    });

    const appendInput = document.getElementById('ingredients-container');
    appendInput.insertAdjacentElement("beforeend", ingredientInputRow);
}

['delete-ingredient-button', 'delete-step-button'].forEach(button => {
    let element = document.getElementById(button);
    element.addEventListener('click', e => {
        e.preventDefault();
        deleteInput(element);
    })
})

function deleteInput(element) {
    let elementId = element.getAttribute('id');
    let ingredientRowCount = document.querySelectorAll('#ingredient-input');
    let ingredientRowLength = ingredientRowCount.length;
    let stepRowCount = document.querySelectorAll('#direction-input');
    let stepRowLength = stepRowCount.length;

    if ((elementId === 'delete-ingredient-button') && ingredientRowLength > 1) {
        let ingredientInputRows = document.getElementById('ingredients-container');
        let ingredientChildren = ingredientInputRows.children;
        let lastIngredient = ingredientChildren[ingredientRowLength - 1];
        lastIngredient.remove();

    } else if ((elementId === 'delete-step-button') && stepRowLength > 1) {
        let directionInputRows = document.getElementById('directions-container');
        let directionChildren = directionInputRows.children;
        let lastDirection = directionChildren[stepRowLength - 1];
        lastDirection.remove();
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
    let directionInputStep = directionInputRow.children[0].children[0].children[0]
    let stepNumber = 'Step ' + directionInputCount;
    directionInputStep.textContent = stepNumber;

    let inputDirection = directionInputRow.children[0].children[1].children[0];
    let newName = inputDirection.name + directionInputCount;
    inputDirection.name = newName;

    const appendInput = document.getElementById('directions-container');
    appendInput.insertAdjacentElement('beforeend', directionInputRow);
}


function nameString(newName) {
    return newName;
}

const ingredientButtonDiv = document.getElementById('ingredient-buttons');
const deleteIngredientButton = document.getElementById('delete-ingredient-button');
const ingredientInputRow = document.getElementById('ingredients-container');
const ingredientConfig = { childList: true }
const ingredientcallback = (mutationList, _observer) => {
    for (const mutation of mutationList) {
        if (mutation.type = 'childList') {
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
const directionInputRow = document.getElementById('directions-container');
const directionconfig = { childList: true }
const directionCallback = (mutationList, _observer) => {
    for (const mutation of mutationList) {
        if (mutation.type = 'childList') {
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