const signUp = document.querySelector('#signUp');

signUp.addEventListener('submit', e => {
    validateSignUp();
})

function validateSignUp() {
    const f_name = document.getElementById('f_name').value.trim();
    const l_name = document.getElementById('l_name').value.trim();
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();

    if (f_name == "") {
        alert('First name cannot be left blank');
        return false;
    } else if (l_name == "") {
        alert('Last name cannot be left blank');
        return false;
    } else if (username == "") {
        alert('Username cannot be left blank');
        return false;
    } else if (password == "") {
        alert('Password cannot be laft blank');
        return false;
    } else {
        return true;
    }
}