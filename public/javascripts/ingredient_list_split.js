const listOne = document.getElementById('listOne');
const listTwo = document.getElementById('listTwo');
const ListOneMetric = document.getElementById('listOneMetric');
const ListTwoMetric = document.getElementById('listTwoMetric');

function splitList(firstList, secondList) {
    let listChildren = firstList.children;
    let listArray = Array.from(listChildren);
    let ingredientsLenght = firstList.children.length;
    let halfListLength = Math.ceil(ingredientsLenght / 2);
    let halfListArray = listArray.slice(halfListLength, ingredientsLenght);

    halfListArray.forEach(item => {
        secondList.appendChild(item);
    });
}

splitList(listOne, listTwo);
splitList(ListOneMetric, ListTwoMetric);