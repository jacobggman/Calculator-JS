// Syntax error
// div by 0 error
import { expect, it } from 'vitest'

import {tokenize, Token, NumberToken, TokenParseException, TokensType} from 'tokenize.js';

it.each([
	["", []],
	["6", [new NumberToken(6)]],
	["+/(*)-", [new Token(TokensType.ADDITION), new Token(TokensType.DIVISION), 
		new Token(TokensType.OPEN_PARENTHESES), new Token(TokensType.MULTIPLICATION), 
		new Token(TokensType.CLOSE_PARENTHESES), new Token(TokensType.SUBTRACTION)]],
])('shuld return expression result have expression', (expression, expressionResult) => {
	expect(tokenize(expression)).toEqual(expressionResult);
});
