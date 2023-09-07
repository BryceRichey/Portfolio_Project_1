const commentButton = document.getElementById('create-comment');
const commentList = document.getElementById('comment-list');

commentButton.addEventListener('click', _e => {
    createComment();
});


function createComment() {
    const form = document.createElement('form');
    const recipeId = document.getElementById('recipe-id').innerHTML;
    const commentContainer = document.createElement('div');

    form.classList.add('new-comment-form');
    form.setAttribute('method', 'post');
    form.setAttribute('action', `/recipes/${recipeId}/comment/new`);
    commentContainer.classList.add('new-comment-container');
    commentContainer.setAttribute('id', 'new-comment-container');
    commentList.insertAdjacentElement('afterbegin', commentContainer);
    commentContainer.appendChild(form);

    const fragment = new DocumentFragment();
    const commentInput = document.createElement('input');
    const commentButtons = document.createElement('div');
    const cancelButton = document.createElement('button');
    const cancelButtonfragment = new DocumentFragment();

    cancelButton.innerText = 'Cancel';
    cancelButton.classList.add('cancel-comment');
    cancelButton.setAttribute('id', 'new-comment-cancel-button');
    cancelButton.setAttribute('type', 'button');
    cancelButtonfragment.appendChild(cancelButton);

    const submitButton = document.createElement('button');
    const submitButtonfragment = new DocumentFragment();

    submitButton.innerText = 'Submit';
    submitButton.setAttribute('type', 'submit');
    submitButton.classList.add('submit-comment');
    submitButtonfragment.appendChild(submitButton);

    fragment.appendChild(commentInput);
    commentInput.classList.add('create-new-comment-input');
    commentInput.classList.add('normal-border');
    commentInput.setAttribute('name', 'comment');
    commentButtons.classList.add('create-new-comment-buttons');
    fragment.appendChild(commentButtons);
    commentButtons.appendChild(cancelButtonfragment);
    commentButtons.appendChild(submitButtonfragment);
    form.appendChild(fragment);

    const commentNewComment = document.getElementById('create-comment');
    commentNewComment.classList.add('not-visible')

    const cancelNewCommentButton = document.getElementById('new-comment-cancel-button');
    const newCommentContainer = document.getElementById('new-comment-container');

    cancelNewCommentButton.addEventListener('click', e => {
        e.preventDefault()
        newCommentContainer.remove();
        commentNewComment.classList.remove('not-visible')
    });
}