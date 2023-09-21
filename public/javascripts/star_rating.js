const starRating = document.getElementById('star-rating-container').querySelectorAll('i');
const mobileStarRating = document.getElementById('mobile-star-rating-container').querySelectorAll('i');

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

mobileStarRating && mobileStarRating.forEach((star) => {
    star.addEventListener('mouseover', e => {
        mobileAddStarRatingFill(e.target);
    })
});

function mobileAddStarRatingFill(starIcon) {
    const stars = document.getElementById('mobile-star-rating-container').querySelectorAll('i');
    hideStarRating(stars);
    const rating = parseInt(starIcon.dataset.star);

    for (let i = 0; i < rating; i++) {
        stars[i].classList.remove('bi-star');
        stars[i].classList.add('bi-star-fill');
    }
}

const stars = document.getElementById('star-rating-container').querySelectorAll('i');

const mobileStars = document.getElementById('mobile-star-rating-container').querySelectorAll('i');

stars && stars.forEach((star) => {
    star.addEventListener('click', e => {
        submitStarRating(e.target);
    })
})

mobileStars && mobileStars.forEach((star) => {
    star.addEventListener('click', e => {
        mobileSubmitStarRating(e.target);
    })
})

function submitStarRating(rating) {
    const url = rating.dataset.url;
    const ratingInt = parseInt(rating.dataset.star);
    const userRating = document.getElementById('user-rating');
    const ratingParagraph = document.getElementById('user-rating-sentence');

    const paragraph = document.createElement('p');
    paragraph.innerText = 'You rated: ' + ratingInt + ' / 5';
    paragraph.setAttribute('id', 'user-rating-sentence');

    const paragraph2 = document.createElement('p');
    paragraph2.innerText = 'Not Rated';
    paragraph2.setAttribute('id', 'user-rating-sentence');

    fetch(url + new URLSearchParams({
        ratingInt
    }), {
        method: 'POST'
    }).then((response) => response.json()).then((data) => {
        if (data.rated == false) {
            ratingParagraph.remove();
            userRating.insertAdjacentElement('afterbegin', paragraph2);
        } else if (data = []) {
            ratingParagraph.remove();
            userRating.insertAdjacentElement('afterbegin', paragraph);
        }
    });
}

function mobileSubmitStarRating(rating) {
    const url = rating.dataset.url;
    const ratingInt = parseInt(rating.dataset.star);
    const userRating = document.getElementById('mobile-user-rating');
    const ratingParagraph = document.getElementById('mobile-user-rating-sentence');

    const paragraph = document.createElement('p');
    paragraph.innerText = 'You rated: ' + ratingInt + ' / 5';
    paragraph.setAttribute('id', 'mobile-user-rating-sentence');

    const paragraph2 = document.createElement('p');
    paragraph2.innerText = 'Not Rated';
    paragraph2.setAttribute('id', 'mobile-user-rating-sentence');

    fetch(url + new URLSearchParams({
        ratingInt
    }), {
        method: 'POST'
    }).then((response) => response.json()).then((data) => {
        if (data.rated == false) {
            ratingParagraph.remove();
            userRating.insertAdjacentElement('afterbegin', paragraph2);
        } else if (data = []) {
            ratingParagraph.remove();
            userRating.insertAdjacentElement('afterbegin', paragraph);
        }
    });
}


const starRatingContainer = document.querySelector('#star-rating-container');
const mobileStarRatingContainer = document.querySelector('#mobile-star-rating-container');

starRatingContainer && starRatingContainer.addEventListener('mouseleave', _e => {
    hideStarRating(starRating);
})
mobileStarRatingContainer && mobileStarRatingContainer.addEventListener('mouseleave', _e => {
    hideStarRating(starRating);
})

function hideStarRating(stars) {
    stars.forEach((star) => {
        star.classList.remove('bi-star-fill');
        star.classList.add('bi-star');
        star.classList.add('star-color');
    });
}