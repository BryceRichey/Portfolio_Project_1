const customaryButton = document.getElementById('customaryButton');
const metricButton = document.getElementById('metricButton');
const customaryWrapper = document.querySelector('.customaryWrapper');
const metricWrapper = document.querySelector('.metricWrapper');
const fahrenheitButton = document.getElementById('fahrenheitButton');
const celciusButton = document.getElementById('celciusButton');
const fahrenheitWrapper = document.querySelector('.fahrenheit-wrapper');
const celciusWrapper = document.querySelector('.celcius-wrapper');

customaryButton.addEventListener('click', e => {
    e.preventDefault();
    toggleCustomaryDisplay();
});

function toggleCustomaryDisplay() {
    addInactiveButton(customaryButton);
    addActiveButton(metricButton);
    notVisible(customaryWrapper, metricWrapper);
}

metricButton.addEventListener('click', e => {
    e.preventDefault();
    toggleMetricDisplay();
});

function toggleMetricDisplay() {
    addInactiveButton(metricButton);
    addActiveButton(customaryButton);
    notVisible(metricWrapper, customaryWrapper);
}

fahrenheitButton.addEventListener('click', e => {
    e.preventDefault();
    toggleFahrenheitDisplay();
})

function toggleFahrenheitDisplay() {
    addInactiveButton(fahrenheitButton);
    addActiveButton(celciusButton);
    notVisible(fahrenheitWrapper, celciusWrapper);
}

celciusButton.addEventListener('click', e => {
    e.preventDefault();
    toggleCelciusDisplay();
})

function toggleCelciusDisplay() {
    addInactiveButton(celciusButton);
    addActiveButton(fahrenheitButton);
    notVisible(celciusWrapper, fahrenheitWrapper);
}

function addInactiveButton(element) {
    element.classList.remove('inactiveButton');
    element.classList.add('activeButton');
}

function addActiveButton(element) {
    element.classList.remove('activeButton');
    element.classList.add('inactiveButton');
}

function notVisible(elementOne, elementTwo) {
    elementOne.classList.remove('not-visible');
    elementTwo.classList.add('not-visible');
}