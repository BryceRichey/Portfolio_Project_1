const updateNames = document.querySelector('#newNames');

updateNames.addEventListener('submit', e => {
    validateNames();
});

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
        alert('Username cannot be left blank')
        return false;
    } else if (newFirstName == "" && newLastName == "") {
        alert('First and last name cannot be left blank')
        return false;
    } else {
        return true;
    }
}