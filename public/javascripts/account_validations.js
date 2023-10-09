const updateContactInformation = document.querySelector('#contact-information');

function validateNames() {
    const newFirstName = document.getElementById('f_name').value.trim();
    const newLastName = document.getElementById('l_name').value.trim();
    const newUsername = document.getElementById('username').value.trim();

    if (newFirstName == "") {
        alert('First name cannot be left blank');
        return false;
    } else if (newLastName == "") {
        alert('Last name cannot be left blank');
        return false;
    } else if (newUsername == "") {
        alert('Username cannot be left blank');
    } else if (newFirstName == "" && newLastName == "") {
        alert('First and last name cannot be left blank');
    } else {
        return true;
    }
}


const updateEmail = document.querySelector('#updateEmail');

updateEmail.addEventListener('blur', e => {
    validateEmailPatternl(updateEmail, e.target.value);
});

async function validateEmailPatternl(email, value) {
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

        if (regexMatch === null) {
            email.classList.remove('normal-border');
            email.classList.add('invalid-border');
            invalidElement.innerHTML = "Email not valid";
        } else {
            let data = {};
            data[email] = value;

            const urlParams = new URLSearchParams(Object.entries(data));

            validElement.innerHTML = '';
            invalidElement.innerHTML = '';

            await fetch(`/signup/user/validations?${urlParams}`)
                .then((response) => response.json())
                .then((data) => {
                    let isEmailTaken = Object.values(data)[0]
                    if (isEmailTaken === 'false') {
                        const errorMsg = 'Email is already in use';
                        validElement.innerHTML = '';
                        email.classList.remove('normal-border');
                        email.classList.remove('valid-border');
                        email.classList.add('invalid-border');
                        invalidElement.innerHTML = errorMsg;
                    } else {
                        invalidElement.innerHTML = '';
                        email.classList.remove('normal-border');
                        email.classList.remove('invalid-border');
                        email.classList.add('valid-border');
                        validElement.innerHTML = 'Email available';
                    }
                });
        }
    }
}


const newPassword = document.getElementById('newPassword');

newPassword.addEventListener('blur', e => {
    validateNewPasswordPatter(newPassword, e.target.value);
});

function validateNewPasswordPatter(password, value) {
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
            password.classList.remove('invalid-border');
            password.classList.add('valid-border');
            validElement.innerHTML = "Password looks good";
        }
    }
}


const confirmPassword = document.getElementById('confirmPassword');


confirmPassword.addEventListener('blur', e => {
    validateNewPasswordMatch(confirmPassword, e.target.value);
});

function validateNewPasswordMatch(confirmPassword, value) {
    const newPasswordValue = newPassword.value.trim();
    const confirmPasswordValue = confirmPassword.value.trim();
    const validElement = confirmPassword.parentElement.querySelector('.valid-message');
    const invalidElement = confirmPassword.parentElement.querySelector('.invalid-message');

    if (confirmPasswordValue == '') {
        confirmPassword.classList.remove('normal-border');
        confirmPassword.classList.remove('valid-border');
        confirmPassword.classList.add('invalid-border');
        invalidElement.innerHTML = "Password cannot be blank";
    } else if (newPasswordValue != confirmPasswordValue) {
        confirmPassword.classList.remove('normal-border');
        confirmPassword.classList.remove('valid-border');
        confirmPassword.classList.add('invalid-border');
        invalidElement.innerHTML = "Password must match";
    } else {
        confirmPassword.classList.remove('normal-border');
        confirmPassword.classList.remove('invalid-border');
        confirmPassword.classList.add('valid-border');
        validElement.innerHTML = "Passwords match";
    }
}