import {tokenize, NumberToken, TokensType} from './tokenize.js';

export default function calculate(expression) {
    const tokens = tokenize(expression);
    return calculateTokens(tokens).value();
}


function calculateTokens(tokens) {

    // first go to () from left to right
    calculateParentheses(tokens);

    // then make * or / left to right
    calculateOperations(tokens, TokensType.MULTIPLICATION, (leftValue, rightValue) => leftValue*rightValue);
    calculateOperations(tokens, TokensType.DIVISION, (leftValue, rightValue) => {
        if (rightValue == 0)
        {
            throw "Div by zero";
        }
        return leftValue / rightValue;
    });

    calculateOperations(tokens, TokensType.ADDITION, (leftValue, rightValue) => leftValue+rightValue);
    calculateOperations(tokens, TokensType.SUBTRACTION, (leftValue, rightValue) => leftValue-rightValue);

    if (tokens.length != 1)
    {
        throw "Bad Syntax";
    }

    validateNumber(tokens[0]);

    return tokens[0];
}

function calculateOperations(tokens, operationType, culcFunc) {
    for (let i = 0; i < tokens.length; i++) {
        const token = tokens[i];
        if (token.type() == operationType)
        {
            if (i == 0)
            {
                throw "Bad Syntax";
            }
            if (i == tokens.length)
            {
                throw "Bad Syntax";
            }
            const leftToken = tokens[i - 1];
            validateNumber(leftToken);
            const rightToken = tokens[i + 1];
            validateNumber(rightToken);
            const result = culcFunc(leftToken.value(), rightToken.value());
            popRange(tokens, i - 1, i + 1);
            i--;
            tokens.splice(i, 0, new NumberToken(result));
        }
    }
}

function calculateParentheses(tokens) {
    for (let i = 0; i < tokens.length; i++) {
        const token = tokens[i];
        if (token.type() == TokensType.OPEN_PARENTHESES)
        {
            const closeIndex = findCloseParentheses(tokens, i);
            // each "("" must have ")" after
            if (!closeIndex)
            {
                throw "Bad Syntax";
            }
            
            innereParenthesesTokens = popRange(token, i, closeIndex);
            const calculatedToken = calculateTokens(innereParenthesesTokens);
            tokens.splice(i, 0, calculatedToken);
        }
    }
}

function validateNumber(token) {
    if (token.type() != TokensType.NUMBER)
    {
        throw "Bad Syntax";
    }
}
function findCloseParentheses(tokens, startIndex) {
    for (let i = startIndex; i < tokens.length; i++) {
        const token = tokens[i];
        if (token.type() == TokensType.CLOSE_PARENTHESES)
        {
            return i;
        }
    }
}

function popRange(arr, startIndex, lastIndex) {
    // Remove elements from startIndex to lastIndex (inclusive)
    return arr.splice(startIndex, lastIndex - startIndex + 1);
}