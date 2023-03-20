const createComment = document.querySelector('#createComment');

createComment.addEventListener('click', e => {
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


const editCommentBtns = document.querySelectorAll('.edit-comment-btn');

editCommentBtns.forEach((button) => {
    button.addEventListener('click', e => {
        showEditInput(e.target);
    });
});

function showEditInput(editBtn) {
    const commentId = editBtn.dataset.commentId;
    const parentElement = document.getElementById(`comment-container-${commentId}`);
    const commentTextElement = document.getElementById(`comment-${commentId}`);

    const editCommentForm = parentElement.querySelector('form');
    const input = document.createElement('input');
    const commentEditBtnId = document.getElementById(`comment-edit-button-id-${commentId}`);
    const commentDeleteBtnId = document.getElementById(`comment-delete-button-id-${commentId}`);
    const submitButton = document.createElement('button');
    const cancelButton = document.createElement('button');

    editCommentForm.appendChild(input);
    input.classList.add('form-control');
    input.setAttribute('name', 'comment');
    input.value = commentTextElement.innerText;

    commentTextElement.style.display = 'none';
    commentEditBtnId.style.display = 'none';
    commentDeleteBtnId.style.display = 'none';

    editCommentForm.appendChild(submitButton).innerText = 'Submit';
    submitButton.classList.add('btn', 'btn-dark', 'my-3', 'float-end');
    submitButton.setAttribute('type', 'submit');
    submitButton.setAttribute('id', 'submitEditComment');

    editCommentForm.appendChild(cancelButton).innerText = 'Cancel';
    cancelButton.classList.add('btn', 'btn-dark', 'my-3', 'mx-1', 'float-end');
    cancelButton.setAttribute('type', 'button');
    cancelButton.setAttribute('id', 'cancelEditComment');

    const cancelEditCommentBtn = document.getElementById('cancelEditComment');

    cancelEditCommentBtn.addEventListener('click', e => {
        removeEditInput();
    });

    function removeEditInput() {
        const commentTextElement = document.getElementById(`comment-${commentId}`);
        const commentEditBtnId = document.getElementById(`comment-edit-button-id-${commentId}`);
        const commentDeleteBtnId = document.getElementById(`comment-delete-button-id-${commentId}`);
        const parentElement = document.getElementById(`comment-container-${commentId}`);
        const editCommentForm = parentElement.querySelector('form');
        const editCommentInput = editCommentForm.querySelector('input');
        const cancelEditCommentBtn = document.getElementById('cancelEditComment');
        const submitEditCommentBtn = document.getElementById('submitEditComment');

        editCommentInput.remove();
        commentTextElement.removeAttribute('style');
        commentEditBtnId.removeAttribute('style');
        commentDeleteBtnId.removeAttribute('style');
        cancelEditCommentBtn.style.display = 'none';
        submitEditCommentBtn.style.display = 'none';
    }
}

// const commentContainer = document.querySelector('#commentContainer');

// commentContainer.addEventListener('mouseenter', _e => {
//     highlightComment();
// });

// function highlightComment() {
//     const commentBackground = document.getElementById('commentBackground');
//     commentBackground.classList.add('bg-secondary-subtle', 'rounded-4');
// }

// commentContainer.addEventListener('mouseleave', _e => {
//     removeHighlightComment();
// });

// function removeHighlightComment() {
//     const commentBackground = document.getElementById('commentBackground');
//     commentBackground.classList.remove('bg-secondary-subtle', 'rounded-4');
// }