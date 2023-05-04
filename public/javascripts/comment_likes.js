const likeCommentBtns = document.querySelectorAll('.like-comment-btn');

likeCommentBtns && likeCommentBtns.forEach((likeCommentBtn) => {
    likeCommentBtn.addEventListener('click', e => {
        likeComment(e.target);
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

        console.log(data);

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

    //     const commentLikeCount = document.getElementById(`comment-${commentId}-like-count`);
    //     console.log(commentId)
    //     console.log(commentLikeCount)

    //     const likeCountString = commentLikeCount.innerText;
    //     const likeCountInt = parseInt(likeCountString);

    //     let newLikeCount = likeCountInt + 1
    //     const newLikeCountInt = newLikeCount;

    //     commentLikeCount.innerText = newLikeCountInt
}