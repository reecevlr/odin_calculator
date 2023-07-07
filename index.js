/* Init Variables */
let x;      // Num 1
let y;      // Num 2
let op;     // Operator
let yFlag = false;
let opFlag = false;
let ansFlag = false;

const numbers = document.querySelectorAll('.num-btn');
const operations = document.querySelectorAll('.op-btn');
const clrBtn = document.querySelector('#clr');
const ansBtn = document.querySelector('#ans');
const ceBtn = document.querySelector('#ce');
const decBtn = document.querySelector('#dec');
const inDisplay = document.querySelector('#in-display');
const opDisplay = document.querySelector('#op-display');

/* Event Listeners */
numbers.forEach(num => {
    num.addEventListener('click', setDisplay);
});

operations.forEach(operator => {
    operator.addEventListener('click', function(e) {
        x = Number(inDisplay.textContent);
        op = e.target.textContent;
        opFlag = true;

        if (ansFlag) {
            opDisplay.textContent = '';
        }

        opDisplay.textContent = '';
        let text = document.createTextNode(`${x} ${e.target.textContent}`);
        opDisplay.appendChild(text);
    });
});

decBtn.addEventListener('click', function(e) {
    if (inDisplay.textContent.includes('.')) {
        return;
    }
    else {
        setDisplay(e);
    }
});

ceBtn.addEventListener('click', function(e) {
    if (inDisplay.textContent === '0') {
        return;
    }

    let text = inDisplay.textContent.slice(0, -1);
    inDisplay.textContent = text;

    if (inDisplay.textContent === '') {
        inDisplay.textContent = '0';
        return;
    }
});

ansBtn.addEventListener('click', function(e) {
    if (yFlag) {
        y = Number(inDisplay.textContent);
        setDisplay(e);
    }
});

clrBtn.addEventListener('click', clearDisplay);

/* Calculator Functions */
function setDisplay(e) {
    if (inDisplay.textContent === '0') {
        inDisplay.textContent = '';
    }

    if (ansFlag) {
        inDisplay.textContent = '';
        ansFlag = false;
    }

    if (opFlag) {
        inDisplay.textContent = '';
        opFlag = false;
        yFlag = true;
    }

    if (e.target.textContent === '=') {
        inDisplay.textContent = '';
        yFlag = false;

        let opText = document.createTextNode(` ${y} = `);
        opDisplay.appendChild(opText);

        x = Number(operate(op, x, y));
        let inText = document.createTextNode(x);
        inDisplay.appendChild(inText);

        ansFlag = true;
        return;
    }

    let text = document.createTextNode(e.target.textContent);
    inDisplay.appendChild(text);
}

function clearDisplay() {
    inDisplay.textContent = '0';
    opDisplay.textContent = '-';

    yFlag = false;
    opFlag = false;
}

/* Math Functions */
function add(x, y) {
    return x + y;
}

function subtract(x, y) {
    return x - y;
}

function multiply(x, y) {
    return x * y;
}

function divide(x, y) {
    return x / y;
}

function operate(op, x, y) {
    if (op === '\u002B') {
        return add(x, y);
    }
    else if (op === '\u002D') {
        return subtract(x, y);
    }
    else if (op === '\u00D7') {
        return multiply(x, y);
    }
    else if (op === '\u00F7') {
        return divide(x, y);
    }
}