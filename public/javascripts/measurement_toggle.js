const customaryButton = document.getElementById('customaryButton');
const metricButton = document.getElementById('metricButton');
const customaryWrapper = document.querySelector('.customaryWrapper');
const metricWrapper = document.querySelector('.metricWrapper');
const fahrenheitButton = document.getElementById('fahrenheitButton');
const celsiusButton = document.getElementById('celsiusButton');
const fahrenheitWrapper = document.querySelector('.fahrenheit-wrapper');
const celsiusWrapper = document.querySelector('.celsius-wrapper');

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
    addActiveButton(celsiusButton);
    notVisible(fahrenheitWrapper, celsiusWrapper);
}

celsiusButton.addEventListener('click', e => {
    e.preventDefault();
    togglecelsiusDisplay();
})

function togglecelsiusDisplay() {
    addInactiveButton(celsiusButton);
    addActiveButton(fahrenheitButton);
    notVisible(celsiusWrapper, fahrenheitWrapper);
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