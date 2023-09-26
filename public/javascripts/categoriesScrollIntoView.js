const selecteCategory = document.getElementsByClassName('active-category-link');


console.log(selecteCategory[0])
// selecteCategory[0].scrollIntoView({behavior: "smooth"});

selecteCategory[0].scrollIntoViewIfNeeded();