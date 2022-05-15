const numberButtons = document.querySelectorAll("[data-number]");
const operationButtons = document.querySelectorAll("[data-operation]");
const equalsButton = document.querySelector("[data-equals]");
const deleteButton = document.querySelector("[data-delete]");
const allClearButton = document.querySelector("[data-allclear]");
const slaveDisplay = document.querySelector("[data-previous-operand]");
const mainDisplay = document.querySelector("[data-current-operand]");

let displayText = "";
slaveDisplay.innerText = "";

let previousNumber = ""; // previous number
let currentNumber; // current number
let currentOperator = "";
let previousOperator = "";
let result;
let otherNumber;
let operatorSelected;

// ADDS EVENT LISTENERS TO ALL THE NUMBERED BUTTONS
numberButtons.forEach((button) => {
  button.addEventListener("click", setupUpDisplay);
});

//EVENT LISTERNER FOR ALL-CLEAR
allClearButton.addEventListener("click", () => {
  displayText = "";
  mainDisplay.innerText = "0";
  slaveDisplay.innerText = "";
  previousNumber = "";
  currentNumber = "0";
  currentOperator = "";
});

//Event Listener for delete button
deleteButton.addEventListener("click", () => {
  displayText = mainDisplay.innerText.toString().slice(0, -1);
  mainDisplay.innerText = displayText;
});

//
function setupUpDisplay(button) {
  if (button.target.innerText === "." && displayText.includes(".")) return;

  displayText += button.target.innerText;
  mainDisplay.innerText = displayText;
  currentNumber = parseInt(displayText);
}

function updateDisplay() {
  slaveDisplay.innerText = `${previousNumber.toString()} ${currentOperator} ${currentNumber.toString()}`;
  mainDisplay.innerHTML = result;
}

// ADDS EVENTS LISTENERS TO ALL THE OPERATOR BUTTONS

operationButtons.forEach((button) => {
  button.addEventListener("click", operate);
});

function operate(button) {
  if (previousNumber == "" && currentNumber == "0") return;

  if (previousNumber === "") {
    console.log("first condition");
    //stores operator to current operator
    currentOperator = button.target.innerText;
    slaveDisplay.innerText = mainDisplay.innerText.toString() + " " + currentOperator;
    previousNumber = parseInt(slaveDisplay.innerText); // stores previous num data
    currentNumber = 0; //will help to reset current
    previousOperator = currentOperator;

    mainDisplay.innerText = "";
    displayText = "";
  } else {
    console.log("second condition");
    previousOperator = currentOperator;
    currentOperator = button.target.innerText;
    previousNumber = parseInt(compute(currentNumber, previousNumber, previousOperator));
    slaveDisplay.innerText = previousNumber.toString() + " " + currentOperator;
    currentNumber = "";
    mainDisplay.innerText = "";
    displayText = "";
  }
  //when operate is clicked :

  compute(currentNumber, previousNumber, currentOperator);
}

equalsButton.addEventListener("click", () => {
  result = compute(currentNumber, previousNumber, currentOperator);
  console.log(result);
  updateDisplay();
});

function compute(fnum, snum, operator) {
  if (operator === "+") {
    return fnum + snum;
  } else if (operator === "-") {
    return snum - fnum;
  } else if (operator === "*") {
    return fnum * snum;
  } else if (operator === "÷" && (fnum || snum != 0)) {
    return snum / fnum;
  }
}

//todo
//---------------------------------//---------------------------------//---------------------------------//---------------------------------//
//do check for double operator input.
//add backspace
//---------------------------------//---------------------------------//---------------------------------//---------------------------------//
