const createComment = document.querySelector('#createComment');

createComment.addEventListener('click', e => {
    e.preventDefault;
    showTextArea();
});

function showTextArea() {
    const commentForm = document.getElementById('commentForm');
    const textArea = document.createElement('textarea');
    const submitButton = document.createElement('button');

    commentForm.textContent = '';
    commentForm.appendChild(textArea);
    textArea.classList.add('form-control');
    textArea.setAttribute('name', 'comment');

    commentForm.appendChild(submitButton).innerText = 'Submit';
    submitButton.classList.add('btn', 'btn-dark', 'mt-3');
    submitButton.setAttribute('type', 'submit');
}