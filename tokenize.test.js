// Syntax error
// div by 0 error
import { expect, it } from 'vitest'

import {tokenize, Token, NumberToken, TokenParseException} from 'tokenize.js';

it('shuld return empty list when have empty expression', () => {

	// should return a string
	expect(tokenize("")).toEqual([]);
});

it('shuld return list of one number when have number expression', () => {

	// should return a string
	expect(tokenize("6")).toEqual([new NumberToken(6)]);
});