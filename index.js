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
window.addEventListener('keydown', function(e) {
    switch (e.key) {
        case 'Backspace':
            clearEntry();
            break;
        case '+':
            supportKey('+');
            break;
        case '-':
            supportKey('-');
            break;
        case '*':
            supportKey('*');
            break;
        case '/':
            e.preventDefault();
            supportKey('/');
            break;
        case 'Enter':
            supportKey('ans');
            break;
        case '1':
            supportKey('1');
            break;
        case '2':
            supportKey('2');
            break;
        case '3':
            supportKey('3');
            break;
        case '4':
            supportKey('4');
            break;
        case '5':
            supportKey('5');
            break;
        case '6':
            supportKey('6');
            break;
        case '7':
            supportKey('7');
            break;
        case '8':
            supportKey('8');
            break;
        case '9':
            supportKey('9');
            break;
        case '0':
            supportKey('0');
            break;
    }
});

function supportKey(key) {
    prepareDisplayOutput();

    switch (key) {
        case '+':
            setValues('\u002B');
            return;
        case '-':
            setValues('\u002D');
            return;
        case '*':
            setValues('\u00D7');
            return;
        case '/':
            setValues('\u00F7');
            return;
        case 'ans':
            if (yFlag) {
                y = Number(inDisplay.textContent);
            }
            prepareDisplayOutput();
            setAnswer();
            return;
    };

    let text = document.createTextNode(key);
    inDisplay.appendChild(text);
}

numbers.forEach(num => {
    num.addEventListener('click', setDisplay);
});

operations.forEach(operator => {
    operator.addEventListener('click', setOperator)
});

decBtn.addEventListener('click', function(e) {
    if (inDisplay.textContent.includes('.')) {
        return;
    }
    else {
        setDisplay(e);
    }
});

ansBtn.addEventListener('click', function(e) {
    if (yFlag) {
        y = Number(inDisplay.textContent);
        setDisplay(e);
    }
});

ceBtn.addEventListener('click', clearEntry);

clrBtn.addEventListener('click', clearDisplay);

/* Calculator Functions */
function clearEntry() {
    if (inDisplay.textContent === '0') {
        return;
    }

    let text = inDisplay.textContent.slice(0, -1);
    inDisplay.textContent = text;

    if (inDisplay.textContent === '') {
        inDisplay.textContent = '0';
        return;
    }
}

function prepareDisplayOutput() {
    if (inDisplay.textContent === '0') {
        inDisplay.textContent = '';
    }

    // if (ansFlag) {
    //     inDisplay.textContent = '';
    //     ansFlag = false;
    // }

    if (opFlag) {
        inDisplay.textContent = '';
        opFlag = false;
        yFlag = true;
    }

    return;
}

function setAnswer() {
    inDisplay.textContent = '';
    yFlag = false;

    let opText = document.createTextNode(` ${y} = `);
    opDisplay.appendChild(opText);

    x = Number(operate(op, x, y));
    let inText = document.createTextNode(x);
    inDisplay.appendChild(inText);

    ansFlag = true;
}

function setDisplay(e) {
    prepareDisplayOutput();

    if (e.target.textContent === '=') {
        setAnswer();
        return;
    }

    let text = document.createTextNode(e.target.textContent);
    inDisplay.appendChild(text);
}

function setOperator(e) {
    setValues(e.target.textContent);
}

function setValues(operator) {
    x = Number(inDisplay.textContent);
    op = operator;
    opFlag = true;

    // if (ansFlag) {
    //     opDisplay.textContent = '';
    // }

    opDisplay.textContent = '';
    let text = document.createTextNode(`${x} ${op}`);
    opDisplay.appendChild(text);
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