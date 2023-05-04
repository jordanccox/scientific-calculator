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
        //console.log(character);
        if (!isNaN(character)) {
            postFix.push(character);
        }

        else if (character === "(") { //problems! test value: 1*(3+4)
            stack.push(character);
            console.log(stack);
        }

        else if (character === ")") { //problems!
            console.log(stack[stack.length - 1]);
            while (stack[stack.length - 1] != "(") {
                postFix.push(stack[stack.length - 1]);
                stack.pop();
            }

            stack.pop(); // removes "("
        }

        else { // operator test value: 1-3/4+3-80^2*9
            let precedenceScanned = checkPrecedence(character);
            let precedenceTopOfStack = checkPrecedence(stack[stack.length - 1]);

            if (stack.length === 0) {
                stack.push(character);
                console.log(character);
            }

            else if (precedenceScanned > precedenceTopOfStack) {
                stack.push(character);
                console.log(stack[stack.length - 1]); //test
            }

            else if (precedenceScanned < precedenceTopOfStack) {
                postFix.push(stack[stack.length - 1]);
                stack.pop();
                stack.push(character);
            }

            else if (character === "^" && stack[stack.length-1] === "^") {
                stack.push(character);
            }

            else if (precedenceScanned === precedenceTopOfStack) {
                postFix.push(stack[stack.length - 1]);
                stack.pop();
                stack.push(character);
            }
        }
    }

    while (stack.length > 0) {
        postFix.push(stack[stack.length - 1]);
        stack.pop();
    }

    console.log(`${postFix} is postFix`);

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