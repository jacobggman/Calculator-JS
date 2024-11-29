// Syntax error
// div by 0 error
import { expect, it } from 'vitest'

import calculate from 'calculate.js';

it.each([
	["2", 2],
    ["2+2", 4],
    ["2-2", 0],
    ["4/2", 2],
    ["4/-2", -2],
    ["-4/-2", 2],
    ["5*5", 25],
    ["1+5-1*5/5", 5],
    ["1*(4+2)/2+3", 6],
    ["(1)", 1],
    ["((1))", 1],
    ["(2+3(3-5)+2(1+1)-6)", -6],
])('shuld return result when get expression', (expression, expressionResult) => {
	expect(calculate(expression)).toEqual(expressionResult);
});


