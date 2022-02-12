import axios from "axios"

export type Exchange = {
	cotacaoCompra: number,
	cotacaoVenda: number,
	dataHoraCotacao: string
}

export class ExchangePrice {
	getUrl(data: string): string {
		return `https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoDolarDia(dataCotacao=@dataCotacao)?@dataCotacao='02-11-2022'&$top=100&$format=json&$select=cotacaoCompra,cotacaoVenda,dataHoraCotacao`
	}

	extractPrices(data: Exchange[]) {
		return data[0]
	}

	async getPrice(): Promise<Exchange> {
		const response = await axios.get<{ value: Exchange[] }>(this.getUrl(''))
		const { data } = response
		return this.extractPrices(data.value)
	}
}