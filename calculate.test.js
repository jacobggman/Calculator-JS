// Syntax error
// div by 0 error
import { expect, it } from 'vitest'

import calculate, {DivByZeroException, CulcParseException} from 'calculate.js';

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


it.each([
	[")"],
	["++"],
	["("],
	["(123))"],
])('shuld throw CulcParseException', (expression) => {
	const t = () => {
		calculate(expression);
	  };
	expect(t).toThrow(CulcParseException);
});


it.each([
	["1/0"],
	["2(3+1)/(1-1)"],
])('shuld throw DivByZeroException', (expression) => {
	const t = () => {
		calculate(expression);
	  };
	expect(t).toThrow(DivByZeroException);
});
