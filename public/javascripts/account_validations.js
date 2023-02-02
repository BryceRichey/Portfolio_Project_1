const account_update = require('../routes/users');

const update_email = document.querySelector('#update_email');

const email = document.getElementById('email').value;
const new_email = document.getElementById('new_email').value;
const confirm_email = document.getElementById('confirm_email').value;

update_email.addEventListener('submit', e => {
    if (new_email == null || confirm_email == null) {
        (new_email && confirm_email === email);
        acconut_update();
    } else if (new_email != confirm_email) {
        console.log('Make sure new email matches');
    } 
    else if (new_email === confirm_email) {
        let email = confirm_email;
        acconut_update({email});
    }
});