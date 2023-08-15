document.addEventListener('DOMContentLoaded', e => {
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
    let ingredientInputCount = count + 1;

    Array.from(ingredientInputRow.children).forEach(input => {
        childrenName = input.children[1].name
        let newName = childrenName + ingredientInputCount
        input.children[1].name = nameString(newName);
    });
    const appendInput = document.getElementById('ingredient-input-row');
    appendInput.append(ingredientInputRow);
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
    let ingredientRowLength = ingredientRowCount.length
    let stepRowCount = document.querySelectorAll('#direction-input');
    let stepRowLength = stepRowCount.length

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
    directionInputStep.textContent = stepNumber

    Array.from(directionInputRow.children).forEach(input => {
        childrenName = input.children[0].name
        let newName = childrenName + directionInputCount
        input.children[0].name = nameString(newName);
    });

    const appendInput = document.getElementById('direction-input-row');
    appendInput.append(directionInputRow);
}

function nameString(newName) {
    return newName;
}