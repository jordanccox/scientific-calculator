// Syntax error
const errorMessage = "Syntax error!";

// Calculator buttons
const clearBtn = document.querySelector("#clearBtn");
const openParenth = document.querySelector("#openParenth");
const closeParenth = document.querySelector("#closeParenth");
const del = document.querySelector("#del");
const oneOverX = document.querySelector("#one-over-x");
const sqrt = document.querySelector("#sqrt");
const cbrt = document.querySelector("#cbrt");
const percent = document.querySelector("#percent");
const squared = document.querySelector("#x-squared");
const cubed = document.querySelector("#x-cubed");
const xToY = document.querySelector("#x-raised-to-y");
const divide = document.querySelector("#divide");
const seven = document.querySelector("#seven");
const eight = document.querySelector("#eight");
const nine = document.querySelector("#nine");
const multiply = document.querySelector("#multiply");
const four = document.querySelector("#four");
const five = document.querySelector("#five");
const six = document.querySelector("#six");
const minus = document.querySelector("#minus");
const one = document.querySelector("#one");
const two = document.querySelector("#two");
const three = document.querySelector("#three");
const plus = document.querySelector("#plus");
const changeSignOfLast = document.querySelector("#change-sign");
const zero = document.querySelector("#zero");
const decimalPoint = document.querySelector("#decimal");
const equals = document.querySelector("#equals");

// Handle button clicks
window.addEventListener(
    "click", 
    (event) => {
        switch (event.target) {
            case clearBtn:
                return clear();
            case openParenth:
            case closeParenth:
            case plus:
            case minus:
            case zero:
            case one:
            case two:
            case three:
            case four:
            case five:
            case six:
            case seven:
            case eight:
            case nine:
                return addInput(event);
            case decimalPoint:
                return addDecimal();
            case del:
                return backspace();
            case oneOverX:
                return oneDividedBy();
            case sqrt:
                return getSqrt();
            case cbrt:
                return getCbrt();
            case percent:
                return changeToPercent();
            case squared:
                return xSquared();
            case cubed:
                return xCubed();
            case xToY:
                return xRaisedToY();
            case divide:
                return division();
            case multiply:
                return multiplication();
            case changeSignOfLast:
                return flipSign();
            case equals:
                return enterInput(document.querySelector("#input").value);
            
        }
    }
);

// Add input
function addInput(event) {
    document.querySelector("#input").value += event.target.innerHTML;
}

function addDecimal() {
    const inputStr = document.querySelector("#input").value;
    const inputLength = inputStr.length;
    const previousValue = inputStr[inputLength - 1];

    if (isNaN(previousValue)) {
        document.querySelector("#input").value += "0.";
    } else {
        document.querySelector("#input").value += ".";
    }
}

// Backspace
function backspace() {
    let inputStr = document.querySelector("#input").value;
    let inputLength = inputStr.length;

    document.querySelector("#input").value = inputStr.substring(0, inputLength - 1);
}

// One divided by last number in input
function oneDividedBy() {
    try {
        const inputElement = document.querySelector("#input");
        const inputStr = inputElement.value.match(/\d+\.\d+|\d+|[+\-/*^()]/g);
        const inputLength = inputStr.length;
        const lastNumber = inputStr[inputLength - 1];

        inputElement.value = inputStr.slice(0, inputLength - 1).join("");
        inputElement.value += `1/(${lastNumber})`;
    } catch (error) {
        document.querySelector("#input").value = errorMessage;
        return;
    }
}

// Get square root
function getSqrt() {
    document.querySelector("#input").value += "^(1/2)";
}

// Get cube root
function getCbrt() {
    document.querySelector("#input").value += "^(1/3)";
}

// Change to percent
function changeToPercent() {
    let inputStr = document.querySelector("#input").value.match(/\d+\.\d+|\d+|[+\-/*^()]/g);
    let inputLength = inputStr.length;
    let lastNumber = Number(inputStr[inputLength - 1]);

    document.querySelector("#input").value = inputStr.slice(0, inputLength - 1).join("");
    document.querySelector("#input").value += lastNumber * 0.01;
}

// Number squared
function xSquared() {
    document.querySelector("#input").value += "^2";

}

// Number cubed
function xCubed() {
    document.querySelector("#input").value += "^3";

}

// Raise number x to power y
function xRaisedToY() {
    document.querySelector("#input").value += "^";
}

// Division
function division() {
    document.querySelector("#input").value += "/";
}

// Multiplication
function multiplication() {
    document.querySelector("#input").value += "*";
}

// Flip sign of last number input to opposite sign
function flipSign() {
    let inputStr = document.querySelector("#input").value.match(/\d+\.\d+|\d+|[+\-/*^()]/g);
    let inputLength = inputStr.length;
    let lastNumber = inputStr[inputLength - 1];

    if (inputStr[inputLength - 2] == "+") {
        document.querySelector("#input").value = inputStr.slice(0, inputLength - 2).join("");
        document.querySelector("#input").value += lastNumber * -1;
    } else if (inputStr[inputLength - 2] == "-" && !isNaN(inputStr[inputLength - 3])) {
        document.querySelector("#input").value = inputStr.slice(0, inputLength - 2).join("");
        document.querySelector("#input").value += "+" + lastNumber;
    } else if (isNaN(inputStr[inputLength - 2]) && inputStr[inputLength - 2] != "-") {
        document.querySelector("#input").value = inputStr.slice(0, inputLength - 1).join("");
        document.querySelector("#input").value += lastNumber * -1;
    } else if (isNaN(inputStr[inputLength - 2]) && inputStr[inputLength - 2] == "-") {
        document.querySelector("#input").value = inputStr.slice(0, inputLength - 2).join("");
        document.querySelector("#input").value += lastNumber;
    } else {
        document.querySelector("#input").value = errorMessage;
        throw errorMessage;
    }

}

// Enter input as a string, then separate into an array of numbers, operators, and parentheses
function enterInput(input) {
    let inputArray = input.match(/\d+\.\d+|\d+|[+\-/*^()]/g);
    let infixExp = [];

    for (let i = 0; i < inputArray.length; i++) {

        if (!isNaN(Number(inputArray[i]))) {
            infixExp.push(Number(inputArray[i]));
        } else {
            infixExp.push(inputArray[i]);
        }
    }

    infixExp = changeSign(infixExp);
    changeToPostfix(infixExp);
}

// Change sign of number following minus to negative number. This allows for much easier handling of cases
// in which a minus follows an operator or precedes an opening parentheses.
function changeSign(input) {
    let newArray = input;

    for (let i = 0; i < newArray.length; i++) { // test value: 1-3*-4-(8*9-4*-(4*6))
        let value = newArray[i]; // minus sign
        let valueBefore = newArray[i - 1]; // num before minus sign
        let numToChange = newArray[i + 1]; // num or parentheses after minus sign
        let start = newArray.slice(0, i);
        let end = newArray.slice(i + 2, newArray.length);

        if (value === "-" && Number(valueBefore) && numToChange !== "(") { //case num - num
            if (isNaN(numToChange * - 1)) {
                document.querySelector("#input").value = errorMessage;
                throw errorMessage;
            }
            newArray = start.concat("+").concat(numToChange * - 1).concat(end);
        } else if (value === "-" && isNaN(valueBefore) && numToChange !== "(") { // case num operator - num and starts with -num
            if (isNaN(numToChange * - 1)) {
                document.querySelector("#input").value = errorMessage;
                throw errorMessage;
            }
            newArray = start.concat(numToChange * - 1).concat(end);
        } else if (value === "-" && Number(valueBefore) && numToChange === "(") { // case num - ()
            end = newArray.slice(i + 1, newArray.length);
            newArray = start.concat("+").concat(-1).concat("*").concat(end);
        } else if (value === "-" && isNaN(valueBefore) && numToChange === "(") { // case num operator - ()
            end = newArray.slice(i + 1, newArray.length);
            newArray = start.concat(-1).concat("*").concat(end);
        }
    }

    return newArray;
}

// Check precedence in the order of operations to allow changing infix expressions to postfix expressions
function checkPrecedence(operator) {
    switch (operator) {
        case "^":
            return 3;
        case "*":
        case "/":
            return 2;
        case "+":
        case "-":
            return 1;
    }
}

// Stack algorithm to change the calculator input to a postfix expression for more efficient operations.
function changeToPostfix(expression) {
    const stack = [];
    const postFix = [];

    for (let i = 0; i < expression.length; i++) {
        let character = expression[i];

        if (!isNaN(character)) {
            postFix.push(character);
        }

        else if (character === "(") {
            stack.push(character);
        }

        else if (character === ")" && stack.includes("(")) {
            while (stack[stack.length - 1] != "(") {
                postFix.push(stack.pop());
            }
            stack.pop(); // removes "("
        }

        else { // operator
            let topOfStack = stack[stack.length - 1];

            while (stack.length != 0 && checkPrecedence(character) <= checkPrecedence(topOfStack)) {
                if (character === "^" && topOfStack === "^") {
                    break;
                } else {
                    postFix.push(stack.pop());
                    topOfStack = stack[stack.length - 1];
                }
            }
            stack.push(character);
        }
    }

    while (stack.length > 0) {
        postFix.push(stack.pop());
    }

    // Error handling
    if (postFix.includes("(") || postFix.includes(")")) {
        document.querySelector("#input").value = errorMessage;
        throw errorMessage;
    }
    evaluateExp(postFix);
}

// Now that the expression is in postfix form, we can evaluate it easily using another stack algorithm.
function evaluateExp(expression) { //test value: 1 + 2 * 3
    const stack = [];
    let op1 = null;
    let op2 = null;
    let operator = null;
    let result = null;

    for (let i = 0; i < expression.length; i++) {
        if (!isNaN(expression[i])) {
            stack.push(expression[i]);
        } else {
            op2 = stack.pop();
            op1 = stack.pop();
            operator = expression[i];

            switch (operator) {
                case "^":
                    result = op1 ** op2;
                    break;
                case "*":
                    result = op1 * op2;
                    break;
                case "/":
                    result = op1 / op2;
                    break;
                case "+":
                    result = op1 + op2;
                    break;
                case "-":
                    result = op1 - op2;
                    break;
                default:
                    document.querySelector("#input").value = errorMessage;
                    throw errorMessage;
            }
            stack.push(result);
        }
    }

    if (isNaN(stack[0])) {
        document.querySelector("#input").value = errorMessage;
        throw errorMessage;
    }

    if (stack.length > 1) {
        document.querySelector("#input").value = errorMessage;
        throw errorMessage;
    }

    document.querySelector("#input").value = stack[0];
}

// Clear the calculator
function clear() {
    document.querySelector("#input").value = "";
}