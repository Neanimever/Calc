const previousOperation = document.querySelector(".previous-operation");
const currentOperation = document.querySelector(".current-operation");
const button = document.querySelectorAll("th");

class Calculator {
  constructor(previousOperation, currentOperation) {
    this.previousOperation = previousOperation;
    this.currentOperation = currentOperation;
    this.currentOp = "";
  }

  addDigit(digit) {
    if (digit === "." && this.currentOperation.innerText.includes(".")) {
      return;
    }

    this.currentOp = digit;
    this.updateScreen();
  }

  processOperation(operation) {
    if (this.currentOperation.innerText === "" && operation !== "C") {
      if (this.previousOperation.innerText !== "") {
        this.changeOperation(operation);
      }
      return;
    }

    let operationValue;
    let previous = +this.previousOperation.innerText.split(" ")[0];
    let current = +this.currentOperation.innerText;

    switch (operation) {
      case "+":
        operationValue = previous + current;
        this.updateScreen(operationValue, operation, current, previous);
        break;
      case "-":
        operationValue = previous - current;
        this.updateScreen(operationValue, operation, current, previous);
        break;
      case "*":
        operationValue = previous * current;
        this.updateScreen(operationValue, operation, current, previous);
        break;
      case "/":
        operationValue = previous / current;
        this.updateScreen(operationValue, operation, current, previous);
        break;
      case "%":
        operationValue = previous % current;
        this.updateScreen(operationValue, operation, current, previous);
        break;
      case "DEL":
        this.delOperator();
        break;
      case "CE":
        this.clearCurrentOperator();
        break;
      case "C":
        this.clearOperator();
        break;
      case "=":
        this.equalOperator();
        break;
      default:
        return;
    }
  }

  updateScreen(
    operationValue = null,
    operation = null,
    current = null,
    previous = null
  ) {
    if (operationValue === null) {
      this.currentOperation.innerText += this.currentOp;
    } else {
      if (previous === 0) {
        operationValue = current;
      }
      this.previousOperation.innerText = `${operationValue} ${operation}`;
      this.currentOperation.innerText = "";
    }
  }

  changeOperation(operation) {
    const mathOperations = ["*", "-", "+", "/", "%"];

    if (!mathOperations.includes(operation)) {
      return;
    }

    this.previousOperation.innerText =
      this.previousOperation.innerText.slice(0, -1) + operation;
  }

  delOperator() {
    this.currentOperation.innerText =
      this.currentOperation.innerText.slice(0, -1);
  }

  clearCurrentOperator() {
    this.currentOperation.innerText = "";
  }

  clearOperator() {
    this.currentOperation.innerText = "";
    this.previousOperation.innerText = "";
  }

  equalOperator() {
    let operation = this.previousOperation.innerText.split(" ")[1];

    this.processOperation(operation);
  }
}

const calc = new Calculator(previousOperation, currentOperation);

button.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const value = e.target.innerText;

    if (+value >= 0 || value === ".") {
      console.log(value);
      calc.addDigit(value);
    } else {
      calc.processOperation(value);
    }
  });
});