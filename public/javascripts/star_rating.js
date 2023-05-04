const starRating = document.getElementById('star-rating-container').querySelectorAll('i');
starRating && starRating.forEach((star) => {
    star.addEventListener('mouseover', e => {
        addStarRatingFill(e.target);
    })
});

function addStarRatingFill(starIcon) {
    const stars = document.getElementById('star-rating-container').querySelectorAll('i');
    hideStarRating(stars);
    const rating = parseInt(starIcon.dataset.star);

    for (let i = 0; i < rating; i++) {
        stars[i].classList.remove('bi-star');
        stars[i].classList.add('bi-star-fill');
    }
}


const starRatingContainer = document.querySelector('#star-rating-container');

starRatingContainer && starRatingContainer.addEventListener('mouseleave', e => {
    hideStarRating(starRating);
})

function hideStarRating(stars) {
    stars.forEach((star) => {
        star.classList.remove('bi-star-fill');
        star.classList.add('bi-star');
    });
}