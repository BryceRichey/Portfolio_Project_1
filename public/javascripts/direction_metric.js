let directionsListOne = document.getElementById('direction-list-one');
let directionsListTwo = document.getElementById('direction-list-two');
let directionsListOneChildren = directionsListOne.children;
let directionsListOneArray = Array.from(directionsListOneChildren);

let text;
let celciusArray = Array();
let regexSplit;
let temp;
let celciusConversion;
let celciusRounded;
let regexReplace

const regex = /\b((\d{3}) ((f|f°)|(degre)((e|es) (f|fahrenheit))))\b/gim;
const regexTwo = /\b(\d{3})\b/gim;

directionsListOneArray.forEach(item => {
    text = item.innerHTML;
    regexSplit = text.split(regexTwo);

    regexSplit.forEach(split => {
        temp = parseInt(split);

        if (regexSplit.length > 1) {
            if (temp == temp) {
                celciusConversion = (temp - 32) / 1.8;
                celciusRounded = Math.ceil(celciusConversion);
                regexReplace = text.replaceAll(regex, celciusRounded + '°C');
                celciusArray.push(regexReplace);
            }
        } else {
            celciusArray.push(text);
        }
    });
});

const element = document.getElementById('direction-list-two');
const fragment = new DocumentFragment();

celciusArray.forEach(item => {
    const li = document.createElement('li');
    li.classList.add('direction-list-item');
    li.textContent = item;
    fragment.appendChild(li);
});

element.appendChild(fragment);
