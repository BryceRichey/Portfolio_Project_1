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
    let data = {}
    data[name] = value;

    const urlParams = new URLSearchParams(Object.entries(data));

    let validation = await fetch(`/sign_up/user/validations?${urlParams}`)
        .then(response => (response.json()))
        .then(data => (data));

    console.log(validation);
}

['username', 'email'].forEach(field => {
    let element = document.getElementById(field);
    element.addEventListener('blur', e => validateUniqueness(field, e.target.value))
});