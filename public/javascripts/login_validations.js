const accountLogin = document.querySelector('#account-login');

accountLogin.addEventListener('submit', e => {
    e.preventDefault();
    validateLogin();
    accountLogin.submit();
})

function validateLogin() {
    validateNotBlank('email');
    validateNotBlank('password');
}

function validateNotBlank(name) {
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

const email = document.getElementById('email');
email.addEventListener('blur', e => {
    validateUniqueness(email, e.target.value)
});

function validateUniqueness(email, value) {
    const invalidElement = email.parentElement.querySelector('.invalid-message');
    if (email.value.length < 1) {
        const errorMsg = 'Email cannot be blank';
        invalidElement.innerHTML = errorMsg;
        email.classList.remove('normal-border');
        email.classList.add('invalid-border');
    } else {
        const regex = /^[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*@[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*$/gm;
        const regexMatch = value.match(regex);
        const invalidElement = email.parentElement.querySelector('.invalid-message');

        if (regexMatch === null) {
            email.classList.remove('normal-border');
            email.classList.add('invalid-border');
            invalidElement.innerHTML = "Email not valid"
        } else {
            invalidElement.innerHTML = '';
            email.classList.remove('normal-border');
            email.classList.add('valid-border');
        }
    }
}

const password = document.getElementById('password');
password.addEventListener('blur', _e => {
    password.classList.remove('invalid-border', 'valid-border');
    validatePasswordPattern(password)
});

function validatePasswordPattern(password) {
    const invalidElement = password.parentElement.querySelector('.invalid-message');

    invalidElement.innerHTML = '';

    if (password.value.length < 1) {
        const errorMsg = 'Password cannot be blank';
        invalidElement.innerHTML = errorMsg;
        password.classList.remove('normal-border');
        password.classList.add('invalid-border');
    } else {
        invalidElement.innerHTML = '';
        password.classList.remove('normal-border');
        password.classList.add('valid-border');
    }
}