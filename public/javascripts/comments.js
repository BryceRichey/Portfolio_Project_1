const createComment = document.querySelector('#createComment');

createComment.addEventListener('click', _e => {
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



const commentContainer = document.querySelector('#commentContainer');

commentContainer.addEventListener('mouseenter', _e => {
        highlightComment();
    });

function highlightComment() {
    const commentBackground = document.getElementById('commentBackground');
    commentBackground.classList.add('bg-secondary-subtle', 'rounded-4');
}



commentContainer.addEventListener('mouseleave', _e => {
    removeHighlightComment();
});

function removeHighlightComment() {
    const commentBackground = document.getElementById('commentBackground');
    commentBackground.classList.remove('bg-secondary-subtle', 'rounded-4');
}