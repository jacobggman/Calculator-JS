// TODO:
// check infinity
// smart control Delete and backspace
// show the result each time that input changed (when click eqwal make the result bigger and the final expression smaller)
// don't allow for invalid syntax or errors (like my phone culc)
// start with zero
// add , to numbers
// check if startParenthesesStack is empty

import calculate from './calculate.js';
import {TokenParseException} from './tokenize.js';
import {CulcParseException, DivByZeroException} from './calculate.js';


let display;
let valueAsStr = "";
let isShiftHolded = false;

window.onload = function() {
    display = document.getElementById('display');

    // disable losing focus 
    display.focus();
    display.onblur = function (_) { 
      setTimeout(function() {
        display.focus()
      }, 10);
  };
};

function appendValue(value) {
  updateScroll(1, () => {
      valueAsStr = valueAsStr.slice(0, display.selectionStart) + value + valueAsStr.slice(display.selectionStart, valueAsStr.length);
  });
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

function deleteOne() {
  if (!valueAsStr)
  {
    return;
  }
  
  updateScroll(-1, () => {
    valueAsStr = valueAsStr.slice(0, display.selectionStart - 1) + valueAsStr.slice(display.selectionStart, valueAsStr.length);
  });
}

function deleteOneRight() {
  if (!valueAsStr)
  {
    return;
  }

  updateScroll(0, () => {
    valueAsStr = valueAsStr.slice(0, display.selectionStart) + valueAsStr.slice(display.selectionStart + 1, valueAsStr.length);
  });

}

function onKeyDown(e) {
  const ALLOW_CHARS = "1234567890-+/*.()";

  e = e || window.event;
  const enterKey = e.key;
  if (enterKey == "ArrowLeft" || enterKey == "ArrowRight")
  {
    return true;
  }
  else if (ALLOW_CHARS.indexOf(enterKey) != -1)
  {
    appendValue(enterKey);
  }
  else if (enterKey == "Shift")
  {
    isShiftHolded = true;
  }
  else if (enterKey == "=" || enterKey == "Enter")
  {
    calculateInput();
  }
  else if (enterKey == "Backspace")
  {
    if (isShiftHolded)
    {
      clearDisplay();
    }
    else
    {
      deleteOne();
    }
  }
  else if (enterKey == "Delete")
  {
    if (isShiftHolded)
    {
      clearDisplay();
    }
    else
    {
      deleteOneRight();
    }
  }

  return false;
}

function onKeyUp(e) {
  e = e || window.event;

  if (e.key == "Shift")
  {
    isShiftHolded = false;
  }

  return false;
}

window.calculateInput = calculateInput;
window.appendValue = appendValue;
window.clearDisplay = clearDisplay;
window.deleteOne = deleteOne;
window.onKeyDown = onKeyDown;
window.onKeyUp = onKeyUp

function updateView() {
  // split into numbers
  //  scan each char
  // for each number add , each 3 digits
  display.value = valueAsStr;
}

function updateScroll(changeIndex, changeCallback) {
  const oldSelectionStart = display.selectionStart;

  changeCallback();
  
  updateView();

  const newSelectionPos = oldSelectionStart + changeIndex; 
  setCursPosition(newSelectionPos);

  display.blur();
  display.focus();
}

function setCursPosition(caretPos) {
  const elem = display;

  if (elem != null) {
      if (elem.createTextRange) {
          var range = elem.createTextRange();
          range.move('character', caretPos);
          range.select();
      }
      else {
          if (elem.selectionStart) {
              elem.focus();
              elem.setSelectionRange(caretPos, caretPos);
          }
          else
              elem.focus();
      }
  }
}