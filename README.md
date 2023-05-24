# Scientific Calculator

## Overview:

This is a simple calculator program designed to mimic the functionality of a basic scientific calculator, inspired by the TI-30 calculator. While it doesn't encompass all the features of a TI-30, it aims to replicate the input behavior, where clicking buttons generates a string of inputs on the screen, as opposed to a simpler calculator that only displays one input on the screen at once.

## Logic:

The calculator follows the order of operations, known as PEMDAS (Parentheses, Exponents, Multiplication and Division, Addition and Subtraction), to ensure accurate calculations.

- **P**arentheses: Operations inside parentheses are performed first.
- **E**xponents[^1]: Exponentiation is evaluated from right to left.
- **M**ultiplication and **D**ivision: Multiplication and division operations are evaluated from left to right.
- **A**ddition and **S**ubtraction: Addition and subtraction operations are evaluated from left to right.

[^1]: Exponentiation is evaluated from right to left to align with the convention used in many programming languages. For example, in the expression "2^3^2," the exponentiation operation is performed as "2^(3^2)" rather than "(2^3)^2."

## Under the Hood:

To process the input and perform calculations, the calculator utilizes two main algorithms:

1. Infix to Postfix Conversion:
   - The input expression, provided in infix notation, is converted to postfix notation using a stack-based algorithm. This conversion ensures the correct order of operations during evaluation.

2. Postfix Evaluation:
   - The postfix expression is evaluated using another stack-based algorithm. The calculator iterates through each element of the postfix expression, performs the appropriate operation (such as addition, subtraction, multiplication, division, or exponentiation), and updates the stack until the final result is obtained.

## How to Use:

[Use the calculator here.](https://jordanccox.github.io/scientific-calculator/)

1. Enter the numbers and operators by clicking the corresponding buttons on the calculator interface.
2. The input will be displayed as a string on the screen, reflecting the sequence of buttons pressed.
3. Press the "=" button to calculate the result.
4. The result will be displayed on the screen.

Please note that this calculator supports basic scientific calculations following the PEMDAS rule. However, due to the simplicity of the implementation, it may not handle complex scientific functions or advanced mathematical operations. It's important to review the input and ensure it adheres to the expected format and constraints to obtain accurate results from the calculator.

Remember to input your expressions carefully, adhering to the rules of PEMDAS, to obtain accurate results.
