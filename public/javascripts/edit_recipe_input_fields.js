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
        childrenName = input.children[1].name
        let newName = childrenName + ingredientInputCount
        input.children[1].name = nameString(newName);
    });

    const appendInput = document.getElementById('ingredients-container');
    appendInput.insertAdjacentElement("beforeend", ingredientInputRow)
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
    directionInputStep.textContent = stepNumber

    let inputDirection = directionInputRow.children[0].children[1].children[0];
    let newName = inputDirection.name + directionInputCount
    inputDirection.name = newName

    const appendInput = document.getElementById('directions-container');
    appendInput.insertAdjacentElement('beforeend', directionInputRow);
}


function nameString(newName) {
    return newName;
}