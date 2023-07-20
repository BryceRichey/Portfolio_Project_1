const createComment = document.querySelector('#createComment');

createComment && createComment.addEventListener('click', e => {
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

editCommentBtns && editCommentBtns.forEach((button) => {
    button.addEventListener('click', e => {
        showEditInput(e.target);
    });
});

function showEditInput(editBtn) {
    const commentId = editBtn.dataset.commentId;
    const parentElement = document.getElementById(`comment-container-${commentId}`);
    const commentTextElement = document.getElementById(`comment-${commentId}`);

    console.log(commentId);

    const editCommentForm = parentElement.querySelector('form');
    const input = document.createElement('input');
    const commentEditBtnId = document.getElementById(`comment-edit-button-id-${commentId}`);
    const commentDeleteBtnId = document.getElementById(`comment-delete-button-id-${commentId}`);
    const cancelEditCommentBtn = commentEditBtnId.parentElement.querySelector('.cancel-edit-btn');
    const submitEditCommentBtn = commentEditBtnId.parentElement.querySelector('.submit-edit-btn');

    editCommentForm.appendChild(input);
    input.classList.add('form-control');
    input.setAttribute('name', 'comment');
    input.value = commentTextElement.innerText;

    commentTextElement.classList.add('d-none');
    commentEditBtnId.classList.add('d-none');
    commentDeleteBtnId.classList.add('d-none');
    cancelEditCommentBtn.classList.remove('d-none');
    submitEditCommentBtn.classList.remove('d-none');
}


const cancelBtns = document.querySelectorAll('.cancel-edit-btn');

cancelBtns.forEach((button) => {
    button.addEventListener('click', e => {
        removeEditInput(e.target);
    });
});

function removeEditInput(cancelEditCommentBtn) {
    const commentEditBtnId = cancelEditCommentBtn.parentElement.querySelector('.edit-comment-btn');
    const commentId = commentEditBtnId.dataset.commentId;
    const commentTextElement = document.getElementById(`comment-${commentId}`);
    const commentDeleteBtnId = document.getElementById(`comment-delete-button-id-${commentId}`);
    const parentElement = document.getElementById(`comment-container-${commentId}`);
    const editCommentForm = parentElement.querySelector('form');
    const editCommentInput = editCommentForm.querySelector('input');
    const submitEditCommentBtn = parentElement.querySelector('.submit-edit-btn');

    editCommentInput.remove();
    commentTextElement.classList.remove('d-none');
    commentEditBtnId.classList.remove('d-none');
    commentDeleteBtnId.classList.remove('d-none');
    cancelEditCommentBtn.classList.add('d-none');
    submitEditCommentBtn.classList.add('d-none');
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