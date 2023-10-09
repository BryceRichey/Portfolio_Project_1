const updateContactInformation = document.querySelector('#contact-information');

// updateContactInformation.addEventListener('submit', e => {
    
// });

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

updateEmail.addEventListener('submit', _e => {
    validateEmail();
});

function validateEmail() {
    const newEmail = document.getElementById('newEmail').value.trim();
    const confirmEmail = document.getElementById('confirmEmail').value.trim();

    if (newEmail == "" || confirmEmail == "") {
        alert('No blank values allowed');
        return false;
    } else if (newEmail != confirmEmail) {
        alert('Make sure new email matches');
        return false;
    } else if (newEmail === confirmEmail) {
        return true;
    }
}


// const updatePassword = document.querySelector('#updatePassword');
// updatePassword.addEventListener('submit', e => {
//     validatePassword();
// });
// function validatePassword() {
//     const newPassword = document.getElementById('newPassword').value.trim();
//     const confirmPassword = document.getElementById('confirmPassword').value.trim();
//     if (newPassword == "" || confirmPassword == "") {
//         alert('No blank values allowed');
//         return false;
//     } else if (newPassword != confirmPassword) {
//         alert('Make sure new password matches');
//         return false;
//     } else if (newPassword === confirmPassword) {
//         return true;
//     }
// }