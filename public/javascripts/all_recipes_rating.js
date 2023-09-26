window.onload = roundRating();

function roundRating() {
    const ratingDiv = document.querySelectorAll('#recipe-rating');
    
    ratingDiv && ratingDiv.forEach(div => {
        let divText = div.innerHTML
        let recipeRating = parseInt(divText);

        if (isNaN(recipeRating)) {
            div.innerHTML = "Not Rated"
        } else {
            div.innerHTML = recipeRating;
        }
    });
}
