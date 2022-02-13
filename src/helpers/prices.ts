import axios from "axios"

export type Exchange = {
	cotacaoCompra: number,
	cotacaoVenda: number,
	dataHoraCotacao: string
}

export class ExchangePrice {
	getUrl(data: string = ''): string {
		return `https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoDolarDia(dataCotacao=@dataCotacao)?@dataCotacao='02-11-2022'&$top=100&$format=json&$select=cotacaoCompra,cotacaoVenda,dataHoraCotacao`
	}

	extractPrices(data: Exchange[]) {
		return data[0]
	}

	getToday(): string {
		const today = new Date()

		return `${(today.getMonth() + 1)}-${today.getDate()}-${today.getFullYear()}`
	}
	async getPrice(): Promise<Exchange> {
		try {
			const today = this.getToday()
			const url = this.getUrl(today)
			const response = await axios.get<{ value: Exchange[] }>(url)
			const { data } = response
			return this.extractPrices(data.value)
		} catch (error) {
			return {
				cotacaoCompra: 5.26,
				cotacaoVenda: 5.26,
				dataHoraCotacao: new Date().toLocaleTimeString('pt-br')
			}
		}
	}
}