// Syntax error
// div by 0 error
import { expect, it } from 'vitest'

import {tokenize, Token, NumberToken, TokenParseException, TokensType} from 'tokenize.js';

it.each([
	["", []],
	["6", [new NumberToken(6)]],
])('shuld return expression result have expression', (expression, expressionResult) => {
	expect(tokenize(expression)).toEqual(expressionResult);
});
