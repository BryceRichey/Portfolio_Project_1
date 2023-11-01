const mq = window.matchMedia("(max-width: 991px)");
const selecteCategory = document.getElementsByClassName('active-category-link');

if (mq.matches) selecteCategory[0].scrollIntoView({ behavior: "smooth" });