const listOne = document.getElementById('listOne');
const listTwo = document.getElementById('listTwo');
const ListOneMetric = document.getElementById('listOneMetric');
const ListTwoMetric = document.getElementById('listTwoMetric');

function splitList(firstList, secondList) {
    let listChildren = firstList.children;
    let listArray = Array.from(listChildren);
    let ingredientsLength = firstList.children.length;
    let halfListLength = Math.ceil(ingredientsLength / 2);
    let halfListArray = listArray.slice(halfListLength);

    // SECOND LIST SWITCHING AROUND INGREDIENT ORDER, WILL FIX SOON
    halfListArray.forEach(item => {
        secondList.appendChild(item);
    });
}

splitList(listOne, listTwo);
splitList(ListOneMetric, ListTwoMetric);