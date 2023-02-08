const createAccount = document.querySelector('#createAccount');

createAccount.addEventListener('submit', e => {
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