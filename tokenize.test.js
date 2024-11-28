// Syntax error
// div by 0 error
import { expect, it } from 'vitest'

import {tokenize, Token, Number, TokenParseException} from 'tokenize.js';

it('Empty expression', () => {

	// should return a string
	expect(tokenize("")).toEqual([]);

});
