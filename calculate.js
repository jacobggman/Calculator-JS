import {tokenize, NumberToken, TokensType} from './tokenize.js';

export default function calculate(expression) {
    const tokens = tokenize(expression);
    return calculateTokens(tokens).value();
}

export class CulcParseException extends Error {
    constructor(message) {
      super(message);
      this.name = this.constructor.name;
    }
}

export class DivByZeroException extends Error {
    constructor(message) {
      super(message);
      this.name = this.constructor.name;
    }
}

export class InfinityException extends Error {
    constructor(message) {
      super(message);
      this.name = this.constructor.name;
    }
}

function calculateTokens(tokens) {

    // first go to () from left to right
    calculateParentheses(tokens);

    // then make * or / left to right
    calculateOperations(tokens, TokensType.MULTIPLICATION, (leftValue, rightValue) => leftValue*rightValue);
    calculateOperations(tokens, TokensType.DIVISION, (leftValue, rightValue) => {
        if (rightValue == 0)
        {
            throw new DivByZeroException();
        }
        return leftValue / rightValue;
    });

    calculateOperations(tokens, TokensType.ADDITION, (leftValue, rightValue) => leftValue+rightValue);
    calculateOperations(tokens, TokensType.SUBTRACTION, (leftValue, rightValue) => leftValue-rightValue);

    if (tokens.length != 1)
    {
        throw new CulcParseException();
    }

    validateNumber(tokens[0]);

    return tokens[0];
}

function calculateParentheses(tokens) {
    const startParenthesesStack = [];
    for (let i = 0; i < tokens.length; i++) {
        const tokenType = tokens[i].type();
        if (tokenType == TokensType.OPEN_PARENTHESES)
        {
            startParenthesesStack.push(i);
        }
        else if (tokenType == TokensType.CLOSE_PARENTHESES)
        {
            if (startParenthesesStack.length == 0)
            {
                throw new CulcParseException();
            }

            const startIndex = startParenthesesStack.pop();
            
            const innereParenthesesTokens = popRange(tokens, startIndex, i);
            
            innereParenthesesTokens.shift();  // remove OPEN_PARENTHESES
            innereParenthesesTokens.pop();  // remove CLOSE_PARENTHESES
            
            const calculatedToken = calculateTokens(innereParenthesesTokens);

            tokens.splice(startIndex, 0, calculatedToken);
            i = startIndex;
        }
    }
}

function calculateOperations(tokens, operationType, culcFunc) {
    for (let i = 0; i < tokens.length; i++) {
        const token = tokens[i];
        if (token.type() == operationType)
        {
            if (i == 0)
            {
                throw new CulcParseException();
            }
            if (i == tokens.length)
            {
                throw new CulcParseException();
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

function validateNumber(token) {
    if (token.type() != TokensType.NUMBER)
    {
        throw new CulcParseException();
    }
    if (token.value() == Infinity)
    {
        throw new InfinityException();
    }
}

function popRange(arr, startIndex, lastIndex) {
    // Remove elements from startIndex to lastIndex (inclusive)
    return arr.splice(startIndex, lastIndex - startIndex + 1);
}
