//Global constants
//const operationsPattern = /^[+\-*/^]+$/g;
//const parenthesesPattern = /^[()]+$/g;
//const numbersPattern = /^\d+$/g;
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
    const output = [];

    //console.log(inputArray);
    for (let i = 0; i < inputArray.length; i++) {

        if (!isNaN(Number(inputArray[i]))) {
            output.push(Number(inputArray[i]));
        } else {
            output.push(inputArray[i]);
        }
    }
    //console.log(output + "test"); //Testing purposes
    calculate(output);
}

/*function calculate(operations) {
    let subOperations = [];
    // base case
    if (operations.length == 1) {
        console.log(operations[0]);
        return operations[0];
    }

    else if (operations.includes("(")) {
        subOperations = operations.slice(operations.indexOf("(") + 1, operations.indexOf(")"));
        calculate(subOperations);
    }

    else if (operations.includes("*")) {
        subOperations = [operations[operations.indexOf("*") - 1] * operations[operations.indexOf("*") + 1]];
        calculate(subOperations);
    }
}*/

function calculate(input) {
    if (input.includes("-")) {
        input = changeSign(input);
    }

    console.log(input); //Testing

    if (input.includes("(")) {
        input = parentheses(input);
    }
}

function changeSign(input) {
    let newArray = input;

    for (let i = 0; i < newArray.length; i++) { // test value: 1-3*-4-(8*9-4*-(4*6))
        let value = newArray[i]; // minus sign
        let valueBefore = newArray[i-1]; // num before minus sign
        let numToChange = newArray[i+1]; // num or parentheses after minus sign
        let start = newArray.slice(0, i);
        let end = newArray.slice(i + 2, newArray.length);
    
        if (value === "-" && Number(valueBefore) && numToChange !== "(") {
            if (isNaN(numToChange * - 1)) {
                throw errorMessage;
            }
            newArray = start.concat("+").concat(numToChange * - 1).concat(end);
        } else if (value === "-" && isNaN(valueBefore) && numToChange !== "(") {
            if (isNaN(numToChange * - 1)) {
                throw errorMessage;
            }
            newArray = start.concat(numToChange * - 1).concat(end);
        } else if (value === "-" && Number(valueBefore) && numToChange === "(") {
            end = newArray.slice(i + 1, newArray.length);
            newArray = start.concat("+").concat(-1).concat("*").concat(end);
        } else if (value === "-" && isNaN(valueBefore) && numToChange === "(") {
            end = newArray.slice(i + 1, newArray.length);
            newArray = start.concat(-1).concat("*").concat(end);
        }
    }

    return newArray;
}

function parentheses() {

}

function sqrt() {

}

function cbrt() {

}

function root() {

}

function exponent() {

}

function multiply() {

}

function divide() {

}

function add() {

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

