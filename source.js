// TODO:
// check if have errors and show it to the screen
// add , to number
// show errors when typing (where have bad syntax)
// make worker for culc

import calculate from './calculate.js';
import {TokenParseException} from './tokenize.js';
import {CulcParseException, DivByZeroException} from './calculate.js';


let display;
let valueAsStr = "";

window.onload = function() {
    display = document.getElementById('display');
};

function appendValue(value) {
  valueAsStr += value;
  display.scrollLeft = display.scrollWidth;
  updateView();
}

function clearDisplay() {
  valueAsStr = "";
  updateView()
}

function calculateInput() {
  if (!valueAsStr)
  {
    updateView(); // For if have error
    return;
  }

  try {
      valueAsStr = calculate(display.value).toString();
      updateView();
    } catch (error) {
      valueAsStr = "";
      if (error instanceof DivByZeroException)
      {
        display.value = "Div by zero error";
      }
      else if (error instanceof CulcParseException || error instanceof TokenParseException )
      {
        display.value = "Format error";
      }
      else
      {
        throw error;
      }
    }
}

function updateView() {
  display.value = valueAsStr;
}

window.calculateInput = calculateInput;
window.appendValue = appendValue;
window.clearDisplay = clearDisplay;
