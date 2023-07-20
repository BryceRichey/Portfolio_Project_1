let pathname = window.location.pathname;

const homeLink = document.getElementById('homeLink')
const recipesLink = document.getElementById('recipesLink')
const categoriesLink = document.getElementById('catergoriesLink')
const submitRecipeLink = document.getElementById('submitRecipeLink')

if (pathname == "/") {
    homeLink.classList.remove('inactive-link');
    homeLink.classList.add('active-link');
} else if (pathname == "/recipes") {
    recipesLink.classList.remove('inactive-link');
    recipesLink.classList.add('active-link');
} else if (pathname == "/recipes/categories") {
    categoriesLink.classList.remove('inactive-link');
    categoriesLink.classList.add('active-link');
} else if (pathname == "/recipes/new") {
    submitRecipeLink.classList.remove('inactive-link');
    submitRecipeLink.classList.add('active-link');
}