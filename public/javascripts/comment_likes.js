const likeCommentBtn = document.querySelector('.like-comment-btn');

likeCommentBtn.addEventListener('click', e => {
    likeComment(e.target);
});

function likeComment(likeBtn) {
    const commentId = likeBtn.dataset.commentId;
    const commentLikeCount = document.getElementById(`comment-${commentId}-like-count`);
    console.log(commentId)
    console.log(commentLikeCount)

    const likeCountString = commentLikeCount.innerText;
    const likeCountInt = parseInt(likeCountString);

    let newLikeCount = likeCountInt + 1
    const newLikeCountInt = newLikeCount;

    commentLikeCount.innerText = newLikeCountInt
}