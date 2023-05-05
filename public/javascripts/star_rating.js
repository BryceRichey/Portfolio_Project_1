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



const stars = document.getElementById('star-rating-container').querySelectorAll('i');
stars && stars.forEach((star) => {
    star.addEventListener('click', e => {
        submitStarRating(e.target);
    })
})

function submitStarRating(rating) {
    const ratingInt = parseInt(rating.dataset.star);
    const url = rating.dataset.url;

    fetch(url + new URLSearchParams({
        ratingInt
    }), {
        method: 'POST'
    }).then((response) => response.json()).then((data) => {
        if (data.rated) {
            console.log('removed');
        } else {
            console.log('added');
        }
    });
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