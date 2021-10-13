const previousNumber = document.querySelector('.previousNumber p');
const mathSign = document.querySelector('.mathSign');
const currentNumber = document.querySelector('.currentNumber');
const buttonsOperator = document.querySelectorAll('.operator');
const buttonClear = document.querySelector('.clear');
const buttonsNumber = document.querySelectorAll('.number');
const buttonEquals = document.querySelector('.equals');
const buttonHistory = document.querySelector('.history-btn');
const calculatorHistory = document.querySelector('.history');
let result = '';

function displayNumbers() {
    if (this.textContent === '.' && currentNumber.innerHTML.includes('.')) return;
    if (this.textContent === '.' && currentNumber.innerHTML === '')
        return currentNumber.innerHTML = '0.'

    currentNumber.innerHTML += this.textContent;
}

function operate() {
    if (currentNumber.innerHTML === '' && this.textContent === '-') {
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
    let a = Number(currentNumber.innerHTML);
    let b = Number(previousNumber.innerHTML);
    let operator = mathSign.innerHTML;

    switch (operator) {
        case '+': result = a + b; break;
        case '-': result = b - a; break;
        case 'x': result = a * b; break;
        case ':': result = b / a; break;
        case '2^': result = b ** a; break;
    }
    if (previousNumber.innerHTML !== '' && currentNumber.innerHTML !== '') {
        addToHistory();
        buttonHistory.classList.add('active');
        currentNumber.innerHTML = result;
        previousNumber.innerHTML = '';
        mathSign.innerHTML = '';
    }
}

function addToHistory() {
    const newHistoryItem = document.createElement('li');
    newHistoryItem.innerHTML = `${currentNumber.innerHTML} ${mathSign.innerHTML} ${previousNumber.innerHTML} = ${result}`;
    newHistoryItem.classList.add('history-item');
    calculatorHistory.appendChild(newHistoryItem);
}

function clearOperation() {
    previousNumber.innerHTML = '';
    currentNumber.innerHTML = '';
    mathSign.innerHTML = '';
}

function clearHistory() {
    calculatorHistory.textContent = '';
    if (calculatorHistory.textContent === '') {
        historyBtn.classList.remove('active');
    }
}

// Nasluchiwanie
buttonEquals.addEventListener('click', showResult);

buttonHistory.addEventListener('click', clearHistory);
buttonClear.addEventListener('click', clearOperation);

buttonsNumber.forEach((button) => {
    button.addEventListener('click', displayNumbers);
});
buttonsOperator.forEach((button) => {
    button.addEventListener('click', operate);
});