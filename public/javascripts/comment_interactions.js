const commentLikeButton = document.querySelectorAll('.like-comment-button');

const idArray = new Array();

commentLikeButton.forEach(button => {
    let commentId = button.dataset.commentId

    idArray.push(commentId);
});

for (let i = 0; i < idArray.length; i++) {
    let likeIcon = document.getElementById(`likedSVG-${idArray[i]}`);
    let unlikeIcon = document.getElementById(`unlikedSVG-${idArray[i]}`);

    if (likeIcon && likeIcon != null) {
        createLikeSVG(idArray[i]);
    } else if (unlikeIcon && unlikeIcon != null) {
        createUnlikeSVG(idArray[i]);
    }
}

function createLikeSVG(commentId) {
    const xmlns = "http://www.w3.org/2000/svg"
    const width = 16;
    const height = 14;

    const svgElement = document.createElementNS(xmlns, "svg");
    svgElement.setAttributeNS(null, "width", width);
    svgElement.setAttributeNS(null, "height", height);
    svgElement.setAttributeNS(null, "viewBox", "0 0 " + width + " " + height);

    let coords = "M 8.01226, 12";
    coords += " L 2.92711, 7.39392";
    coords += " C 0.163439, 4.63025, 4.22603, -0.675993, 8.01226, 3.6169";
    coords += " C 11.7985, -0.675993, 15.8427, 4.64868, 13.0974, 7.39392";
    coords += " L 8.01226, 12 Z";

    const path = document.createElementNS(xmlns, "path");
    path.setAttributeNS(null, 'stroke', "#636366");
    path.setAttributeNS(null, 'stroke-width', "2");
    path.setAttributeNS(null, 'stroke-linecap', "round");
    path.setAttributeNS(null, 'stroke-linejoin', "rounded");
    path.setAttributeNS(null, 'd', coords);
    path.setAttributeNS(null, 'fill', "#636366");
    svgElement.appendChild(path);

    let svgContainer = document.getElementById(`likedSVG-${commentId}`);
    svgContainer.appendChild(svgElement);
}

function createUnlikeSVG(commentId) {
    const xmlns = "http://www.w3.org/2000/svg"
    const width = 16;
    const height = 14;

    const svgElement = document.createElementNS(xmlns, "svg");
    svgElement.setAttributeNS(null, "width", width);
    svgElement.setAttributeNS(null, "height", height);
    svgElement.setAttributeNS(null, "viewBox", "0 0 " + width + " " + height);

    let coords = "M 8.01226, 12";
    coords += " L 2.92711, 7.39392";
    coords += " C 0.163439, 4.63025, 4.22603, -0.675993, 8.01226, 3.6169";
    coords += " C 11.7985 -0.675993 15.8427 4.64868 13.0974 7.39392";
    coords += " L 8.01226, 12 Z";

    const path = document.createElementNS(xmlns, "path");
    path.setAttributeNS(null, 'stroke', "#636366");
    path.setAttributeNS(null, 'stroke-width', "2");
    path.setAttributeNS(null, 'stroke-linecap', "round");
    path.setAttributeNS(null, 'stroke-linejoin', "rounded");
    path.setAttributeNS(null, 'd', coords);
    path.setAttributeNS(null, 'fill', "none");
    svgElement.appendChild(path);

    const svgContainer = document.getElementById(`unlikedSVG-${commentId}`);
    svgContainer.appendChild(svgElement);
}

commentLikeButton.forEach((button) => {
    button.addEventListener('click', e => {
        likeComment(e.currentTarget);
    });
});

function likeComment(likeButton) {
    const buttonId = likeButton.dataset.commentId;
    const buttonInteraction = likeButton.children[0];
    const likeIcon = buttonInteraction.children[1];
    const svg = likeIcon.children[0];
    const url = likeButton.dataset.url;

    let fragment = new DocumentFragment();
    let div = document.createElement('div');

    fetch(url, {
        method: 'POST'
    }).then((response) => response.json()).then((data) => {
        const countElement = likeButton.querySelector('.comment-like-count');

        let likesCount = parseInt(countElement.innerText);

        if (data.liked) {
            div.setAttribute('id', `likedSVG-${buttonId}`);
            fragment.appendChild(div);
            likeIcon.appendChild(fragment);
            createLikeSVG(buttonId);
            svg.remove();
            likesCount++;
        } else {
            div.setAttribute('id', `unlikedSVG-${buttonId}`);
            fragment.appendChild(div);
            likeIcon.appendChild(fragment);
            createUnlikeSVG(buttonId);
            svg.remove();
            likesCount--;
        }

        countElement.innerText = likesCount;
    });
}