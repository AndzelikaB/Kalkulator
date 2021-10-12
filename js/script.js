// var input = document.getElementById("input");
// var button = document.getElementById("button");
// var answer = document.getElementById("answer");
// var list = document.getElementById("list");
// var i = 0;

// button.addEventListener("click", sprawdz);            // nasłuchiwanie na kliknięcie

// var losuj = Math.floor(Math.random() * 10) + 1;         // stworzenie losowania zmiennej 

// function sprawdz() {                                    //funkcja sprawdzająca czy wylosowana liczba jest taka jak podana
//     var odpowiedz = Number(input.value);                //number - zmienia na liczbe
//     answer.innerHTML = odpowiedz;                   //pobranie wartości wpisanej w pole input i umieszczenie go w answer

//     if (Number.isInteger(odpowiedz) && odpowiedz >= 1 && odpowiedz <= 10) {
//         i++;

//         var li = document.createElement("li");
//         list.appendChild(li);
//         list.lastChild.innerHTML = "Odpowiedź " + i.toString() + ": " + odpowiedz;


//         if (odpowiedz < losuj) {
//             answer.innerHTML = "Liczba wylosowana jest WIĘKSZA od podanej";
//         }
//         else if (odpowiedz > losuj) {
//             answer.innerHTML = "Liczba wylosowana jest MNIEJSZA od podanej";
//         }
//         else {
//             answer.classList.add("good");
//             answer.innerHTML = "Brawo zgadłeś za " + i + " razem !";
//             button.innerHTML = "Odśwież";
//             button.addEventListener("click", Odśwież);
//         }
//     }
//     else {
//         alert("Błąd")
//     }

// }
// console.log(losuj);

// function Odśwież() {
//     location.reload();
// }

const currentNumber = document.querySelector('.currentNumber');
const previousNumber = document.querySelector('.previousNumber p');
const mathSign = document.querySelector('.mathSign');
const numbersButtons = document.querySelectorAll('.number');
const operatorsButtons = document.querySelectorAll('.operator');
const equalsButton = document.querySelector('.equals');
const clearButton = document.querySelector('.clear');
const calculatorHistory = document.querySelector('.history');
const historyBtn = document.querySelector('.history-btn');

let result = '';

function displayNumbers() {
    if (this.textContent === "." && currentNumber.innerHTML.includes('.'))
        return;

    if (this.textContent === "." && currentNumber.innerHTML === '')
        return currentNumber.innerHTML = ".0";

    currentNumber.innerHTML += this.textContent;
}

function operate() {
    if (currentNumber.innerHTML === '' && this.textContent === '-')      // currentnumber - jesli pierwszej liczby nie ma  | textContent - jeśli klikniemy minus to 
    {
        currentNumber.innerHTML = '-';
        return;
    }
    else if (currentNumber.innerHTML === '') {
        return;
    }

    if (mathSign.innerHTML !== '') {
        showResult();
    }

    previousNumber.innerHTML = currentNumber.innerHTML;
    mathSign.innerHTML = this.textContent;
    currentNumber.innerHTML = '';

}

function showResult() {
    if (previousNumber.innerHTML === '' || currentNumber.innerHTML === '') return currentNumber.innerHTML = "nie podano";

    let a = Number(currentNumber.innerHTML);
    let b = Number(previousNumber.innerHTML);
    let operator = mathSign.innerHTML;

    switch (operator) {
        case '+':
            result = a + b;
            break;
        case '-':
            result = b - a;
            break;
        case 'x':
            result = a * b;
            break;
        case ':':
            result = b / a;
            break;
        case '2^':
            result = b ** a;
            break;
    }

    addToHistory();
    historyBtn.classList.add('active'); //pokazanie buttona z histori do czszczenia
    currentNumber.innerHTML = result;
    previousNumber.innerHTML = '';
    mathSign.innerHTML = '';

}

function addToHistory() {
    const newHistoryItem = document.createElement('li');
    newHistoryItem.innerHTML = `${currentNumber.innerHTML} ${mathSign.innerHTML} ${previousNumber.innerHTML} = ${result}`;
    newHistoryItem.classList.add('history-item');
    calculatorHistory.appendChild(newHistoryItem);

}

function clearHistory() {
    calculatorHistory.textContent = '';
    if (calculatorHistory.textContent === '') {
        historyBtn.classList.remove('active');
    }
}

function clearScreen() {
    result = '';
    currentNumber.innerHTML = '';
    previousNumber.innerHTML = '';
    mathSign.innerHTML = '';
}



//Nasłuchiwanie przycisków

operatorsButtons.forEach((button) => button.addEventListener('click', operate));
equalsButton.addEventListener('click', showResult);
clearButton.addEventListener('click', clearScreen);

numbersButtons.forEach((button) => {
    button.addEventListener('click', displayNumbers);
});

historyBtn.addEventListener('click', clearHistory);
