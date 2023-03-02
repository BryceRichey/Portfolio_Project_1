const createAccount = document.querySelector('#createAccount');

createAccount.addEventListener('submit', e => {
    e.preventDefault;
    validateAccount();
});

function validateAccount() {
    const firstName = document.getElementById('f_name').value.trim();
    const lastName = document.getElementById('l_name').value.trim();
    const username = document.getElementById('username').value.trim();
    const email = document.getElementById('email').value.trim();

    if (firstName == "") {
        alert('First name cannot be left blank');
        return false;
    } else if (lastName == "") {
        alert('Last name cannot be left blank');
        return false;
    } else if (username == "") {
        alert('Username cannot be left blank')
        return false;
    } else if (email == "") {
        alert('Email cannot be left blank')
        return false;
    } else if (firstName == "" && lastName == "") {
        alert('First and last name cannot be left blank')
        return false;
    } else {
        return true;
    }
}

async function validateUniqueness(name, value) {
    const element = document.getElementById(name);
    const invalidElement = element.parentElement.querySelector('.invalid-feedback');
    const errorName = name.charAt(0).toUpperCase() + name.slice(1);

    element.classList.remove('is-invalid', 'is-valid');

    if (element.value.length < 1) {
        // add 'cannot be blank' message
        const errorMsg = errorName + ' cannot be blank';
        invalidElement.innerHTML = errorMsg;
        element.classList.add('is-invalid');
        return;
    }

    let data = {}
    data[name] = value;

    const urlParams = new URLSearchParams(Object.entries(data));

    let validation = await fetch(`/sign_up/user/validations?${urlParams}`)
        .then(response => (response.json()))
        .then(data => (data));

    if (validation[name] === false) {
        const errorMsg = errorName + ' is taken';
        invalidElement.innerHTML = errorMsg;
        element.classList.add('is-invalid');
    } else if (validation[name] === true) {
        element.classList.add('is-valid');
    }
}

['username', 'email'].forEach(field => {
    let element = document.getElementById(field);
    element.addEventListener('blur', e => {
        validateUniqueness(field, e.target.value)
    });
});


async function validateNotBlank(name, value) {
    const element = document.getElementById(name);
    const invalidElement = element.parentElement.querySelector('.invalid-feedback');
    const errorName = name.charAt(0).toUpperCase() + name.slice(1);

    element.classList.remove('is-invalid', 'is-valid');

    if (element.value.length < 1) {
        // add 'cannot be blank' message
        const errorMsg = errorName + ' cannot be blank';
        invalidElement.innerHTML = errorMsg;
        element.classList.add('is-invalid');
        return;
    }
    ['f_name', 'l_name', 'password'].forEach(field => {
        let element = document.getElementById(field);
        element.addEventListener('blur', e => {
            validateUniqueness(field, e.target.value)
        });
    })
}