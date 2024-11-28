// Syntax error
// div by 0 error
import {tokenize, Token, Number, TokenParseException} from './tokenize.js';

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
  console.log(tokenize(display.value));
}

window.calculate = calculate;
window.appendValue = appendValue;
window.clearDisplay = clearDisplay;
