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
  
}
