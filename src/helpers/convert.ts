/**
 * Convert a value from a currency to another
 * @param {number} value - number
 * @param {number} dolarValue - number
 */
export const convert = (value: number, dolarValue: number) => value * dolarValue

/**
 * Convert a number to a string with two decimal places
 * @param {number} val - number
 */
export const toMoney = (val: number) => val.toFixed(2)