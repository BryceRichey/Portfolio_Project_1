let pathname = window.location.pathname;

const homeLink = document.getElementById('homeLink');
const mobileNavHome = document.getElementById('mobile-nav-home');
const mobileNavHomeChild = mobileNavHome.children;

const recipesLink = document.getElementById('recipesLink');
const mobileNavRecipes = document.getElementById('mobile-nav-recipes');
const mobileNavRecipesChild = mobileNavRecipes.children;

const categoriesLink = document.getElementById('catergoriesLink');
const mobileNavCategories = document.getElementById('mobile-nav-categories');
const mobileNavCategoriesChild = mobileNavCategories.children;

const submitRecipeLink = document.getElementById('submitRecipeLink');
const mobileNavNew = document.getElementById('mobile-nav-new');
const mobileNavNewChild = mobileNavNew.children;

if (pathname == "/") {
    homeLink.classList.remove('inactive-link');
    mobileNavHome.classList.remove('inactive-link');
    mobileNavHomeChild[0].classList.remove('mobile-nav-link-black');

    homeLink.classList.add('active-link');
    mobileNavHomeChild[0].classList.add('mobile-nav-link-white');
    mobileNavHome.classList.add('active-link');
} else if (pathname == "/recipes") {
    recipesLink.classList.remove('inactive-link');
    mobileNavRecipes.classList.remove('inactive-link');
    mobileNavRecipesChild[0].classList.remove('mobile-nav-link-black');

    recipesLink.classList.add('active-link');
    mobileNavRecipesChild[0].classList.add('mobile-nav-link-white');
    mobileNavRecipes.classList.add('active-link');
} else if (pathname == "/recipes/categories") {
    categoriesLink.classList.remove('inactive-link');
    mobileNavCategories.classList.remove('inactive-link');
    mobileNavCategoriesChild[0].classList.remove('mobile-nav-link-black');

    categoriesLink.classList.add('active-link');
    mobileNavCategoriesChild[0].classList.add('mobile-nav-link-white');
    mobileNavCategories.classList.add('active-link');
} else if (pathname == "/recipes/new") {
    submitRecipeLink.classList.remove('inactive-link');
    mobileNavNew.classList.remove('inactive-link');
    mobileNavNewChild[0].classList.remove('mobile-nav-link-black');

    submitRecipeLink.classList.add('active-link');
    mobileNavNewChild[0].classList.add('mobile-nav-link-white');
    mobileNavNew.classList.add('active-link');
}