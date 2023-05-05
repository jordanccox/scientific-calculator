//Global constants
const errorMessage = "Syntax error!";

// On input
document.querySelector("#input").oninput = () => requirePattern(document.querySelector("#input").value);

//Event listener for submit click

function requirePattern(input) {
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
    const infixExp = [];

    //console.log(inputArray);
    for (let i = 0; i < inputArray.length; i++) {

        if (!isNaN(Number(inputArray[i]))) {
            infixExp.push(Number(inputArray[i]));
        } else {
            infixExp.push(inputArray[i]);
        }
    }
    //console.log(output + "test"); //Testing purposes
    changeToPostfix(infixExp);
}

function checkPrecedence(character) {
    switch (character) {
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
    console.log(expression); //Testing
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

        console.log(stack); //test
        console.log(postFix); //test
    }

    while (stack.length > 0) {
        postFix.push(stack.pop());
    }

    console.log(`${postFix} is postFix`); //test

    // Error handling
    if (postFix.includes("(") || postFix.includes(")")) {
        throw errorMessage; //Add print to screen eventually
    }

    // Add error handling for placing operators next to each other (*/ for example)

    // In evaluate expression, add error handling for expression.length > 1 or expression.length < 1 (throw syntax error)

    evaluateExp(expression);
}

function evaluateExp(expression) {

}

function clear() {

}

// At input ()

/*

Steps:

1. Break string into array
2. Turn even array elements (0, 2, 4, etc.) into Number
3. Search array according to PEMDAS
4. When desired operator is found (except parentheses, which will be a different rule), take
operator index -1 and operator index + 1 and put them together.
5. For parentheses, separate numbers and operators within parentheses and then apply steps 3 and 4.

*/

//console.log(checkPrecedence("*"));

/* Test values: 
Infix: 2+3*4 Postfix: 2 3 4 * +

Infix: (2+3)*4 Postfix: 2 3 + 4 *

Infix: 2^3^4 Postfix: 2 3 4 ^ ^

Infix: (2+3)*(4+5) Postfix: 2 3 + 4 5 + *

Infix: 2+3*4^5 Postfix: 2 3 4 5 ^ * +

Infix: (2+3)*(4^5+6) Postfix: 2 3 + 4 5 ^ 6 + *

Infix: (1+2)*(3/4)^(5+6) Postfix: 1 2 + 3 4 / 5 6 + ^ *

Infix: (1*(2+3)*4) Postfix: 1 2 3 + * 4 *

Infix: (1^(2+3)*4) Postfix: 1 2 3 + ^ 4 *

Infix: (1*(2+3)^4) Postfix: 1 2 3 + 4 ^ *

*/