const filesSelected = document.getElementById('filesSelected');
const deleteFiles = document.getElementById('delete-photos-button');
const photoButtonDiv = document.getElementById('photo-buttons');
const fileInput = document.getElementById('fileInput');

fileInput.addEventListener('change', _e => {
    for (const file of fileInput.files) {
        filesSelected.innerText += file.name;
        photoButtonDiv.classList.remove('single-photo-button');
        photoButtonDiv.classList.add('photo-buttons');
        deleteFiles.classList.remove('not-visible');
    }
});

deleteFiles.addEventListener('click', e => {
    e.preventDefault();
    fileInput.files.value = null;

    filesSelected.innerText = ""; 

    photoButtonDiv.classList.add('single-photo-button');
    photoButtonDiv.classList.remove('photo-buttons');
    deleteFiles.classList.add('not-visible');
});