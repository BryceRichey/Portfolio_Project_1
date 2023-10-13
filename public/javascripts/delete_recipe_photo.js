const deleteButton = document.getElementById('delete-photo-button');
const url = deleteButton.dataset.url;
const urlSplitArray = url.split('/');
const publicId = urlSplitArray[2] + '/' + urlSplitArray[3];


deleteButton && deleteButton.addEventListener('click', e => {
    e.preventDefault();
    deleteRecipePhoto(url, publicId);
    showFileSelector();
});

function deleteRecipePhoto(url, publicId) {
    fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            publicId
        })
    }).then((response) => {
        return response
    })
}

function showFileSelector() {
    const recipePhotoWrapper = document.getElementById('recipe-photos-edit-wrapper');
    recipePhotoWrapper.innerHTML = '';

    const fileSelectorTemplate = document.getElementById('file-selector-template').content.cloneNode(true);
    recipePhotoWrapper.append(fileSelectorTemplate);

    const filesSelected = document.getElementById('filesSelected');
    const deleteFiles = document.getElementById('delete-photos-button');
    const photoButtonDiv = document.getElementById('photo-buttons');
    const fileInput = document.getElementById('fileInput');

    fileInput.addEventListener('change', _e => {
        for (const file of fileInput.files) {
            filesSelected.innerText += file.name;
        }
        photoButtonDiv.classList.remove('single-photo-button');
        photoButtonDiv.classList.add('photo-buttons');
        deleteFiles.classList.remove('not-visible');
    });

    deleteFiles.addEventListener('click', e => {
        e.preventDefault();
        fileInput.files.value = null;

        filesSelected.innerText = "";
    });
}