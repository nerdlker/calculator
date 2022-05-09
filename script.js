const numberButtons = document.querySelectorAll("[data-number]");
const operationButtons = document.querySelectorAll("[data-operation]");
const equalsButton = document.querySelector("[data-equals]");
const deleteButton = document.querySelector("[data-delete]");
const allClearButton = document.querySelector("[data-allclear]");
const slaveDisplay = document.querySelector("[data-previous-operand]");
const mainDisplay = document.querySelector("[data-current-operand]");

let displayText = "";
slaveDisplay.innerText = "";

let previousNumber; // previous number
let currentNumber; // current number
let currentOperator;
let result;
let isFirst;

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
  isFirst = true;
});

//
function setupUpDisplay(button) {
  if (button.target.innerText === "." && displayText.includes(".")) return;

  displayText += button.target.innerText;
  mainDisplay.innerText = displayText;
  currentNumber = parseInt(displayText);
  isFirst = true;
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
  //what happens when an operator is clicked

  //when operate is clicked :

  currentOperator = button.target.innerText; //stores operator to current operator
  slaveDisplay.innerText =
    mainDisplay.innerText.toString() + " " + button.target.innerText; // updates slave display
  previousNumber = parseInt(slaveDisplay.innerText); // stores previous num data
  currentNumber = 0; //will help to reset current
  result = doMath(currentNumber, previousNumber, currentOperator);
  mainDisplay.innerText = "";
  displayText = "";
}

equalsButton.addEventListener("click", () => {
  result = doMath(currentNumber, previousNumber, currentOperator);
  console.log(result);
  updateDisplay();
});

function doMath(fnum, snum, operator) {
  console.log("i was clicked");

  if (operator === "+") {
    return fnum + snum;
  } else if (operator === "-") {
    return snum - fnum;
  } else if (operator === "*") {
    return fnum * snum;
  } else if ((operator === "÷" && fnum) || snum != 0) {
    return snum / fnum;
  }
}

//todo
//---------------------------------//---------------------------------//---------------------------------//---------------------------------//
//do check for double operator input.
// hitting operator should evaulate if current numbers are present; HINT : try check if previousNumber is null
//---------------------------------//---------------------------------//---------------------------------//---------------------------------//
