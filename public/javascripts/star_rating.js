const starIconOne = document.querySelector('#star-1');
const starIconOneFill = document.querySelector('#star-1-fill');
const starIconTwo = document.querySelector('#star-2');
const starIconTwoFill = document.querySelector('#star-2-fill');
const starIconThree = document.querySelector('#star-3');
const starIconThreeFill = document.querySelector('#star-3-fill');
const starIconFour = document.querySelector('#star-4');
const starIconFourFill = document.querySelector('#star-4-fill');
const starIconFive = document.querySelector('#star-5');
const starIconFiveFill = document.querySelector('#star-5-fill');


const starRating = document.querySelectorAll('.bi-star');

starRating.forEach((star) => {
    star.addEventListener('mouseover', e => {
        addStarRatingFill(e.target);
    })
});

function addStarRatingFill(starIcon) {
    const rating = parseInt(starIcon.dataset.star);

    if (rating === 1) {
        starIconOne.classList.add('d-none');
        starIconOneFill.classList.remove('d-none');
    } else if (rating === 2) {
        starIconOne.classList.add('d-none');
        starIconOneFill.classList.remove('d-none');
        starIconTwo.classList.add('d-none');
        starIconTwoFill.classList.remove('d-none');
    } else if (rating === 3) {
        starIconOne.classList.add('d-none');
        starIconOneFill.classList.remove('d-none');
        starIconTwo.classList.add('d-none');
        starIconTwoFill.classList.remove('d-none');
        starIconThree.classList.add('d-none');
        starIconThreeFill.classList.remove('d-none');
    } else if (rating === 4) {
        starIconOne.classList.add('d-none');
        starIconOneFill.classList.remove('d-none');
        starIconTwo.classList.add('d-none');
        starIconTwoFill.classList.remove('d-none');
        starIconThree.classList.add('d-none');
        starIconThreeFill.classList.remove('d-none');
        starIconFour.classList.add('d-none');
        starIconFourFill.classList.remove('d-none');
    } else if (rating === 5) {
        starIconOne.classList.add('d-none');
        starIconOneFill.classList.remove('d-none');
        starIconTwo.classList.add('d-none');
        starIconTwoFill.classList.remove('d-none');
        starIconThree.classList.add('d-none');
        starIconThreeFill.classList.remove('d-none');
        starIconFour.classList.add('d-none');
        starIconFourFill.classList.remove('d-none');
        starIconFive.classList.add('d-none');
        starIconFiveFill.classList.remove('d-none');
    }
}


const starRatingContainer = document.querySelector('#star-rating-container');

starRatingContainer.addEventListener('mouseleave', e => {
    console.log('working');
    hideStarRating();
})

function hideStarRating() {
    starIconOne.classList.remove('d-none');
    starIconTwo.classList.remove('d-none');
    starIconThree.classList.remove('d-none');
    starIconFour.classList.remove('d-none');
    starIconFive.classList.remove('d-none');
    starIconOneFill.classList.add('d-none');
    starIconTwoFill.classList.add('d-none');
    starIconThreeFill.classList.add('d-none');
    starIconFourFill.classList.add('d-none');
    starIconFiveFill.classList.add('d-none');
}