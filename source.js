// Syntax error
// div by 0 error
const NUMBERS = "0123456789"

const TokensType = Object.freeze({
    NUMBER:   Symbol("number"),
    MULTIPLICATION:  Symbol("multiplication"),
    DIVISION: Symbol("division"),
    ADDITION: Symbol("addition"),
    SUBTRACTION: Symbol("subtraction"),
    START_PARENTHESES: Symbol("start_parentheses"),
    END_PARENTHESES: Symbol("end_parentheses"),
});

const STR_TO_TOKEN_TYPE = new Map();
STR_TO_TOKEN_TYPE.set("*", TokensType.MULTIPLICATION);
STR_TO_TOKEN_TYPE.set("/", TokensType.DIVISION);
STR_TO_TOKEN_TYPE.set("+", TokensType.ADDITION);
STR_TO_TOKEN_TYPE.set("(", TokensType.START_PARENTHESES);
STR_TO_TOKEN_TYPE.set(")", TokensType.END_PARENTHESES);

let display;

window.onload = function() {
    display = document.getElementById('display');
};

function appendValue(value) {
  display.value += value;
}

function clearDisplay() {
  display.value = '';
}

function calculate() {
  
}

class TokenParseException extends Error {
    constructor(message) {
      super(message);
      this.name = this.constructor.name;
    }
  }
  

function tokenize(expressionStr) {
    const tokens = [];
    for (let i = 0; i < expressionStr.length; i++) {
        const tokenStr = array[i];
        
        if (STR_TO_TOKEN_TYPE.has(tokenStr))
        {
            const tokenType = STR_TO_TOKEN_TYPE.get(tokenStr);
            checkIfNeedToAddMul(tokenType, tokens);
            
            tokens.push(new Token(tokenType));
        }
        else if (tokenStr == "-") { // can be minus and subtraction
            [token, i] = tokenizeMinusOrSubtraction(expressionStr, i, tokens);
            tokens.push(token);
        } else {  // probably a number
            [token, i] = tokenizeNumber(expressionStr, i);
            tokens.push(token);
        }
    }

    // each "("" must have ")" after

    // first go to () from left to right
    // then make * or / left to right
    // then + - left to right
}

function checkIfNeedToAddMul(tokenType, tokens) {
    // number(...) == number*(...)
    // (...)(...) == (...)*(...)
    if (tokenType != TokensType.START_PARENTHESES)
    {
        return;
    }

    if (isLastTokenExpression(tokens))
    {
        tokens.push(new Token(TokensType.MULTIPLICATION));
    }
}

function tokenizeMinusOrSubtraction(expressionStr, i, tokens) {
    // 2--3 = 1 (only two in a row is allow)
    if (isLastTokenExpression(tokens))
    {
        return [new Token(TokensType.SUBTRACTION), i];
    }
    
    return tokenizeNumber(expressionStr, i);
}

function tokenizeNumber(expressionStr, startIndex) {
    // possible ways of numbers: 123, -323, 123.4, -0.2, .1, -.6
    let numAsStr = "";
    if (expressionStr[startIndex] == "-")
    {
        numAsStr = "-"
        startIndex++;
    }
    let hasDot = false;
    let asleastOnChar = false;
    let index;
    for (index = startIndex; index < expressionStr.length; index++) {
        const element = expressionStr[index];
        if (element == ".")
        {
            if (hasDot)
            {
                throw new TokenParseException();
            }
            hasDot = true;
        }
        else
        {
            if (!NUMBERS.includes(element))
            {
                break;
            }
            asleastOnChar = true;
        }
        numAsStr += element;
    }
    if (!asleastOnChar)
    {
        throw new TokenParseException();
    }
    const number = Number(numAsStr);
    if (number === NaN)
    {
        throw new TokenParseException();
    }
    return index - 1, new Number(number);
}

function isLastTokenExpression(tokens) {
    // return false if it the first token
    if (tokens.length == 0)
    {
        return false;
    }

    const lastTokenIndex = tokens.length - 1;
    const lastToken = tokens[lastTokenIndex];
    const lastTokenType = lastToken.type();
    return lastTokenType == TokensType.NUMBER || lastTokenType == TokensType.END_PARENTHESES;
}

class Expression {
    tokens

    constructor(tokens)
    {
        this.tokens = tokens
    }

    evaluate() {

    }
}

class Token {
    tokenType
    constructor(tokenType)
    {
        this.tokenType = tokenType
    }

    type() {
        return this.tokenType
    }
}

class Number extends Token {
    number
    constructor(number)
    {
        this.number = number
        this.tokenType = TokensType.NUMBER
    }

    value() {
        return this.number
    }
}