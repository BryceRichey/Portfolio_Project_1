const editCommentButtons = document.querySelectorAll('.edit-comment');

editCommentButtons && editCommentButtons.forEach((button) => {
    button.addEventListener('click', e => {
        showEditInput(e.target);
    });
});

function showEditInput(editBtn) {
    const commentId = editBtn.dataset.commentId;
    const parentElement = document.getElementById(`comment-container-${commentId}`);
    const commentTextElement = document.getElementById(`comment-${commentId}`);

    const form = parentElement.querySelector('form');
    const input = document.createElement('input');
    const div = document.createElement('div');
    const userInteraction = form.nextElementSibling;
    const commentButtons = document.getElementById('buttons-wrapper');

    commentTextElement.classList.add('not-visible');
    userInteraction.classList.add('not-visible');
    commentButtons.classList.add('not-visible');
    input.classList.add('edit-comment-input-field');
    input.classList.add('normal-border');
    input.setAttribute('name', 'comment');
    input.value = commentTextElement.innerText;
    input.setAttribute('id', 'edit-comment-form');
    form.appendChild(input);
    form.appendChild(div);
    form.classList.add('edit-comment-form');
    div.classList.add('edit-comment-form-buttons');
    div.setAttribute('id', 'edit-comment-form-buttons');


    let cancelButton = document.createElement('button');
    const cancelButtonfragment = new DocumentFragment();

    cancelButton.innerText = 'Cancel';
    cancelButton.setAttribute('type', 'button');
    cancelButton.setAttribute('id', 'cancel-comment');
    cancelButton.classList.add('cancel-comment');
    cancelButtonfragment.appendChild(cancelButton);
    div.appendChild(cancelButtonfragment);


    let submitButton = document.createElement('button');
    const submitButtonfragment = new DocumentFragment();

    submitButton.innerText = 'Submit';
    submitButton.setAttribute('type', 'submit');
    submitButton.classList.add('submit-comment');
    submitButtonfragment.appendChild(submitButton);
    div.appendChild(submitButtonfragment);

    const cancelEditButton = document.getElementById('cancel-comment');

    cancelEditButton.addEventListener('click', _e => {
        input.remove();
        div.remove();
        form.classList.remove('edit-comment-form');
        userInteraction.classList.remove('not-visible');
        commentButtons.classList.remove('not-visible');
        commentTextElement.classList.remove('not-visible');
    });
}