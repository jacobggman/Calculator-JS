// Syntax error
// div by 0 error
import {calculate} from './calculate.js';

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

function calculate() {
    display.value = calculate(display.value);
}

window.calculate = calculate;
window.appendValue = appendValue;
window.clearDisplay = clearDisplay;
