const filesSelected = document.getElementById('filesSelected');
const deleteFiles = document.getElementById('delete-photos-button');
const fileInput = document.getElementById('fileInput');

fileInput.addEventListener('change', _e => {
    for (const file of fileInput.files) {
        filesSelected.innerText += file.name;
    }
});

deleteFiles.addEventListener('click', e => {
    e.preventDefault();
    fileInput.files.value = null;

    filesSelected.innerText = ""; 
});