// TODO:
// go right when enter long text
// check if have errors and show it to the screen
// add , to number
// show errors when typing (where have bad syntax)
// make worker for culc

import calculate from './calculate.js';

let display;

window.onload = function() {
    display = document.getElementById('display');
};

function appendValue(value) {
  display.value += value;
}

function clearDisplay() {
  display.value = '';
}

function calculateInput() {
    display.value = calculate(display.value);
}

window.calculateInput = calculateInput;
window.appendValue = appendValue;
window.clearDisplay = clearDisplay;
