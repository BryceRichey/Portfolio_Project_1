const createAccount = document.querySelector('#create-account');

createAccount.addEventListener('submit', e => {
    e.preventDefault();
    validateAccount();
});

function validateAccount() {
    validateNotBlank('first-name');
    validateNotBlank('last-name');
    validateNotBlank('email');
    validateNotBlank('password');
}


['first-name', 'last-name', 'email', 'password'].forEach(field => {
    let element = document.getElementById(field);
    element.addEventListener('blur', e => {
        validateNotBlank(field, e.target.value)
    });
});

function validateNotBlank(name, _value) {
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
        return;
    } else {
        element.classList.remove('normal-border');
        element.classList.add('valid-border');
    }
}


const email = document.getElementById('email');
email.addEventListener('blur', e => {
    validateUniqueness(email, e.target.value)
});

async function validateUniqueness(email, value) {
    const validElement = email.parentElement.querySelector('.valid-message');
    const invalidElement = email.parentElement.querySelector('.invalid-message');
    if (email.value.length < 1) {
        const errorMsg = 'Email cannot be blank';
        validElement.innerHTML = '';
        invalidElement.innerHTML = errorMsg;
        email.classList.remove('normal-border');
        email.classList.add('invalid-border');
    } else {
        const regex = /^[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*@[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*$/gm;
        const regexMatch = value.match(regex);
        const validElement = email.parentElement.querySelector('.valid-message');
        const invalidElement = email.parentElement.querySelector('.invalid-message');

        if (regexMatch === null) {
            email.classList.remove('normal-border');
            email.classList.add('invalid-border');
            invalidElement.innerHTML = "Email not valid"
        } else {
            let data = {}
            data[email] = value;

            const urlParams = new URLSearchParams(Object.entries(data));

            validElement.innerHTML = '';
            invalidElement.innerHTML = '';

            await fetch(`/sign_up/user/validations?${urlParams}`)
                .then((response) => response.json())
                .then((data) => {
                    let isEmailTaken = Object.values(data)[0]
                    if (isEmailTaken === 'false') {
                        const errorMsg = 'Email is already in use';
                        validElement.innerHTML = '';
                        email.classList.remove('normal-border');
                        email.classList.add('invalid-border');
                        invalidElement.innerHTML = errorMsg;
                    } else {
                        invalidElement.innerHTML = '';
                        email.classList.remove('normal-border');
                        email.classList.add('valid-border');
                    }
                });
        }
    }
}


const password = document.getElementById('password');
password.addEventListener('blur', e => {
    password.classList.remove('invalid-border', 'valid-border');
    validatePasswordPattern(password, e.target.value)
});

function validatePasswordPattern(password, value) {
    const regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{8,20}/;
    const regexText = regex.test(value);
    const validElement = password.parentElement.querySelector('.valid-message');
    const invalidElement = password.parentElement.querySelector('.invalid-message');

    if (password.value.length < 1) {
        const errorMsg = 'Password cannot be blank';
        validElement.innerHTML = '';
        invalidElement.innerHTML = errorMsg;
        password.classList.remove('normal-border');
        password.classList.add('invalid-border');
    } else {
        validElement.innerHTML = '';
        invalidElement.innerHTML = '';

        if (regexText === false) {
            password.classList.remove('normal-border');
            password.classList.add('invalid-border');
            invalidElement.innerHTML = "Password must contains:<br><br>• 8-20 characters <br>• An uppercase letter <br>• An lowercase letter <br> • A number <br>• A symbol"
        } else {
            password.classList.remove('normal-border');
            password.classList.add('valid-border');
            validElement.innerHTML = "Password looks good";
        }
    }
}