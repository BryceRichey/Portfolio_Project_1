window.onload = roundRating();

function roundRating() {
    const ratingDiv = document.querySelectorAll('#recipe-rating');
    
    ratingDiv && ratingDiv.forEach(div => {
        let divText = div.innerHTML;
        let recipeRating = parseFloat(divText).toFixed(1);

        if (isNaN(recipeRating)) {
            div.innerHTML = "Not Rated";
        } else {
            div.innerHTML = recipeRating;
        }
    });
}