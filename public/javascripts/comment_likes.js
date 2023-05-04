const likeCommentBtns = document.querySelectorAll('.like-comment-btn');

likeCommentBtns && likeCommentBtns.forEach((likeCommentBtn) => {
    likeCommentBtn.addEventListener('click', e => {
        console.log(e.currentTarget);
        likeComment(e.currentTarget);
    });
})

function likeComment(likeBtn) {
    const commentId = likeBtn.dataset.commentId;
    const url = likeBtn.dataset.url;

    fetch(url, {
        method: 'POST'
    }).then((response) => response.json()).then((data) => {
        const icon = likeBtn.querySelector('i');
        const countElement = likeBtn.querySelector('h6');
        let likesCount = parseInt(countElement.innerText);


        if (data.liked) {
            icon.classList.remove('bi-hand-thumbs-up');
            icon.classList.add('bi-hand-thumbs-up-fill');
            likesCount++;
        } else {
            icon.classList.add('bi-hand-thumbs-up');
            icon.classList.remove('bi-hand-thumbs-up-fill');
            likesCount--;
        }

        countElement.innerText = likesCount;
    });
}