// Syntax error
// div by 0 error
import { expect, it } from 'vitest'

import {tokenize, Token, NumberToken, TokenParseException, TokensType} from 'tokenize.js';

it.each([
	["", []],
	["62", [new NumberToken(62)]],
	["062", [new NumberToken(62)]],
	["-63", [new NumberToken(-63)]],
	["-063", [new NumberToken(-63)]],
	["-64.1", [new NumberToken(-64.1)]],
	["65.1", [new NumberToken(65.1)]],
	[".16", [new NumberToken(0.16)]],
	["-.17", [new NumberToken(-0.17)]],
	["+/(*)-", [new Token(TokensType.ADDITION), new Token(TokensType.DIVISION), 
		new Token(TokensType.OPEN_PARENTHESES), new Token(TokensType.MULTIPLICATION), 
		new Token(TokensType.CLOSE_PARENTHESES), new Token(TokensType.SUBTRACTION)]],
	["-2--2", [new NumberToken(-2), new Token(TokensType.SUBTRACTION), new NumberToken(-2)]],
	["-2-2", [new NumberToken(-2), new Token(TokensType.SUBTRACTION), new NumberToken(2)]],
	["2-2", [new NumberToken(2), new Token(TokensType.SUBTRACTION), new NumberToken(2)]],
])('shuld return expression result have expression', (expression, expressionResult) => {
	expect(tokenize(expression)).toEqual(expressionResult);
});
