import { ExchangePrice } from "./prices";

let exchange: ExchangePrice | null = null
beforeAll(() => {
	exchange = new ExchangePrice()
})

describe('ExchangePrice Class', () => {
	it('Should return a Exchenge Object ', async () => {
		if (exchange !== null) {

			const price = await exchange.getPrice()

			expect(price).toHaveProperty('cotacaoCompra')
			expect(price).toHaveProperty('cotacaoVenda')
			expect(price).toHaveProperty('dataHoraCotacao')
			
			expect(typeof price.cotacaoCompra).toBe('number')
		}
	});
});