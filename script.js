//Universal error
const errorMessage = "Syntax error!";

// Calculator keys
const clearBtn = document.querySelector("#clearBtn");
const openParenth = document.querySelector("#openParenth");
const closeParenth = document.querySelector("#closeParenth");
const del = document.querySelector("#del");
const oneOverX = document.querySelector("#one-over-x");
const one = document.querySelector("#one");

// Event listeners for clicks and keydowns
clearBtn.onclick = clear;
openParenth.onclick = addInput;
closeParenth.onclick = addInput;
del.onclick = backspace;
oneOverX.onclick = oneDividedBy;
one.onclick = addInput;

//Add input (NEW FUNCTION)
function addInput(event) {
    document.querySelector("#input").value += event.target.innerHTML;
}

//Backspace
function backspace() {
    let inputStr = document.querySelector("#input").value;
    let inputLength = inputStr.length;

    document.querySelector("#input").value = inputStr.substring(0, inputLength - 1);
}

//One over x

function oneDividedBy () { // prompt to enter value for x
    document.querySelector("#input").value += "1/(x)";
}

// On input //remove
document.querySelector("#input").oninput = () => requirePattern(document.querySelector("#input").value);

//ADD** Event listener for submit click

function requirePattern(input) { //remove when button functionality with keyboard is working
    const pattern = /^[0-9+\-*/^().]+$/g;

    if (pattern.test(input)) {
        document.querySelector("#input").value = input;
    } else {
        let text = input.slice(0, -1);

        document.querySelector("#input").value = text;
    }
}

// event listener for equals button
let equals = document.querySelector("#equals");
equals.addEventListener("click", () => enterInput(document.querySelector("#input").value));

function enterInput(input) {
    //console.log(input + "enterInput");
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

function changeSign(expression) {
    let newArray = expression;

    for (let i = 0; i < newArray.length; i++) { // test value: 1-3*-4-(8*9-4*-(4*6))
        let value = newArray[i]; // minus sign
        let valueBefore = newArray[i - 1]; // num before minus sign
        let numToChange = newArray[i + 1]; // num or parentheses after minus sign
        let start = newArray.slice(0, i);
        let end = newArray.slice(i + 2, newArray.length);

        if (value == "-" && isNaN(valueBefore) && !isNaN(numToChange)) {
            newArray = start.concat(numToChange * -1).concat(end);
        }
    }

    return newArray;
}

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

function changeToPostfix(expression) {
    //console.log(expression); //Testing
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

       // console.log(stack); //test
        //console.log(postFix); //test
    }

    while (stack.length > 0) {
        postFix.push(stack.pop());
    }

    //console.log(`${postFix} is postFix`); //test

    // Error handling
    if (postFix.includes("(") || postFix.includes(")")) {
        throw errorMessage; //Add print to screen eventually
    }

    // In evaluate expression, add error handling for expression.length > 1 or expression.length < 1 (throw syntax error)
   // console.log(postFix); 
    evaluateExp(postFix);
}

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
                    console.log(operator + " " + op1 + " " + op2)
                    throw errorMessage;
            }

            stack.push(result);

        }

        //stack.push(getResult(op1, op2, operator));
        //console.log(stack); //testing
    }

    if (isNaN(stack[0])) {
        throw errorMessage;
    }

    console.log(stack[0]); // display result for now
}

function clear() {
    document.querySelector("#input").value = "";
}

/*

Button functionality:
- 

*/