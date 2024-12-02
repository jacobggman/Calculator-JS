// TODO:
// and add backbutton
// have curser (for changing other stuff)
// keyboard support
// show the result each time that input changed (when click eqwal make the result bigger and the final expression smaller)
// check infinity
// don't allow for invalid syntax (like my phone culc)
// start with zero
// add , to numbers
// check if startParenthesesStack is empty

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
  // split into numbers
  //  scan each char
  // for each number add , each 3 digits
  display.value = valueAsStr;
}

window.calculateInput = calculateInput;
window.appendValue = appendValue;
window.clearDisplay = clearDisplay;
