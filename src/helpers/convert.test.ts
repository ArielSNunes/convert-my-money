import { convert, toMoney } from "./convert";

describe('Convert Test', () => {
	it('Should convert my value', () => {
		expect(convert(1, 3)).toEqual(3)
	})
})

describe('ToMoney Test', () => {
	it('Should convert my value', () => {
		const val = 14.4512354123
		expect(toMoney(val)).toEqual(val.toFixed(2))
	})
})