const filesSelected = document.getElementById('filesSelected');
const deleteFiles = document.getElementById('delete-photos-button');
const fileInput = document.getElementById('fileInput');

fileInput.addEventListener('change', _e => {
    for (const file of fileInput.files) {
        console.log(file);
        filesSelected.innerText += file.name;
    }
});

deleteFiles.addEventListener('click', e => {
    e.preventDefault();
    document.getElementById('fileInput').files.value = null;

    filesSelected.innerText = ""; 
});