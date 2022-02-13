import { Exchange, ExchangePrice } from "./prices";

let exchange: ExchangePrice | null = null

jest.mock('axios')

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
	})
	it('Should get today correct ', async () => {
		if (exchange !== null) {
			const today = new Date()

			expect(exchange.getToday()).toEqual(`${(today.getMonth() + 1)}-${today.getDate()}-${today.getFullYear()}`)
		}
	})
	it('Should get today correct ', async () => {
		if (exchange !== null) {
			const listaExchanges: Exchange[] = [
				{
					cotacaoCompra: 5.26,
					cotacaoVenda: 5.26,
					dataHoraCotacao: new Date().toLocaleTimeString('pt-br')
				},
				{
					cotacaoCompra: 5.26,
					cotacaoVenda: 5.26,
					dataHoraCotacao: new Date().toLocaleTimeString('pt-br')
				}
			]

			expect(exchange.extractPrices(listaExchanges)).toEqual(listaExchanges[0])
		}
	})


})
