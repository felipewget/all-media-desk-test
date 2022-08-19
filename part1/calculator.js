var allowedOperators = ['-', '+', '/', '*'];

const _getRangeOfOperation = (arrExpression) => {

    let index = arrExpression.findIndex((value) => value == ")");
    let hasParenthesesBracketsOrKeys = index > -1
    if (hasParenthesesBracketsOrKeys) {

        let indexFinishParent = arrExpression.findIndex((value) => value == "(");
        return {
            expression: arrExpression.slice(index, indexFinishParent + 1),
            range: {
                start: index,
                finish: indexFinishParent
            }
        }

    }

    return {
        expression: arrExpression,
        range: {
            start: 0,
            finish: arrExpression.length - 1
        }
    }

}

const executeOperation = (numbers, operator) => {
    const number2 = parseFloat(numbers.number2);
    const number1 = parseFloat(numbers.number1);

    switch (operator) {
        case "*":
            return number1 * number2
        case "/":
            return number1 / number2
        case "-":
            return number1 - number2
        case "+":
            return number1 + number2
        default:
            return null
    }

}

const _getRangeOfExpression = (index, rangeExpression) => {

    if (!allowedOperators.includes(rangeExpression[index])) {
        return false;
    }

    let rangeNumber1 = ([...rangeExpression].slice(0, index).reverse());
    let rangeNumber2 = ([...rangeExpression].slice(index + 1).reverse());
    rangeNumber2.reverse()

    let finishRangeNumber1 = rangeNumber1.findIndex((character) => isNaN(character) && character != "-" && character != '.');
    if (finishRangeNumber1 > -1) {
        rangeNumber1 = rangeNumber1.slice(0, finishRangeNumber1)
    }

    let finishRangeNumber2 = rangeNumber2.findIndex((character) => isNaN(character) && character != '.');
    if (finishRangeNumber2 > -1) {
        rangeNumber2 = rangeNumber2.slice(0, finishRangeNumber2)
    }

    // Check if before number is - because transform the number in negative
    if ([...rangeExpression].slice(index + 2)[0] == "-") {
        rangeNumber2.push("-")
    }
    rangeNumber2.reverse()

    return {
        result: executeOperation({
            number1: rangeNumber2.join(''),
            number2: rangeNumber1.join('')
        }, rangeExpression[index]),
        leftSpaces: rangeNumber2.length,
        rightSpaces: rangeNumber1.length,
        indexOperator: index
    }

}

const _updateArrExpressionValues = (result, expression, fullExpression, rangeInsideFullExpression) => {

    let treated = String(result.result).split('').reverse()
        .map((value) => value != "-" && value != "." ? Number(value) : value);

    let startArray = expression.slice(0, result.indexOperator - result.rightSpaces)
    let finishArray = expression.slice(result.indexOperator + result.leftSpaces + 1)

    // If there are 2 or more numbers but not operators because is +, I add +
    if (finishArray.length > 0) {
        let operatorsInFinishArray = finishArray.filter((value) => isNaN(value) && value != ".");
        let operatorsInTreatedResult = treated.filter((value) => isNaN(value) && value != ".");
        if (operatorsInFinishArray.length == 0 && operatorsInTreatedResult == 0) {
            treated.push("+")
        }
    }

    expression = [...startArray, ...treated, ...finishArray]

    // No have more operations so  I can remove ( )
    if (expression.findIndex(value => allowedOperators.filter(operators => operators != '-').includes(value)) == -1) {
        expression = expression.filter((value, index) => index == 0 && value == ')' || expression.length - 1 == index && value == '(' ? false : true)
    }

    expression = expression.filter((value, index) => value == "+" && expression[index - 1] == "-" ? false : true)

    startArray = fullExpression.slice(0, rangeInsideFullExpression.start)
    finishArray = fullExpression.slice(rangeInsideFullExpression.finish + 1)

    return [...startArray, ...expression, ...finishArray];

}

const checkExpression = (expression) => {
    const check = expression.replace(/[0-9()-+/.*-]|/g, '');
    return check.length == 0
}

const calculate = (expression, debug = false) => {

    try {

        expression = expression.trim()
        if (checkExpression(expression) === false) {
            throw new Error(`Invalid Expression: ${expression}`)
        }

        if (debug === true) {
            console.log('Step: ', expression)
        }

        let arrExpression = expression
            .split("")
            .map((character) => isNaN(character) ? character : Number(character))
            .reverse();

        if (debug === true) {
            console.log('Stack: ', JSON.stringify(arrExpression), '\n')
        }

        const range = _getRangeOfOperation(arrExpression);
        let hasCalculated = false;

        range.expression.forEach((character, index) => {

            // Multiplication and Division are resolved before add or subtration
            let hasMultiplicationOrDivision = range.expression.findIndex((value) => value == "*" || value == "/") > -1
            if (isNaN(character) && character != "." && character != "(" && character != ")" && !hasCalculated) {

                if (hasMultiplicationOrDivision == true && (character != '*' && character != '/')) {
                    return;
                }

                let result = _getRangeOfExpression(index, range.expression)
                arrExpression = _updateArrExpressionValues(result, range.expression, arrExpression, range.range);
                hasCalculated = true;
            }

        });

        let resp = arrExpression.reverse().join('')

        if (expression == resp) {
            if (debug === true) {
                console.log('Response: ', expression)
                console.log('-------------------')
            }
            return resp;
        } else {
            return calculate(resp, debug)
        }

    } catch (e) {

        return {
            error: "INVALID_EXPRESSION",
            message: e.message
        }

    }

}

module.exports = calculate