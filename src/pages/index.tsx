import type { GetServerSideProps, InferGetServerSidePropsType, NextPage } from 'next'
import { useEffect, useState } from 'react'
import PageTitle from '../components/PageTitle'
import { convert, toMoney } from '../helpers/convert'
import { Exchange, ExchangePrice } from '../helpers/prices'

export interface HomePageProps {
	cotacao: Exchange
}

export const getServerSideProps: GetServerSideProps<HomePageProps> = async () => {
	const exchange = new ExchangePrice()
	const cotacao = await exchange.getPrice()

	return {
		props: {
			cotacao
		}
	}
}

const Home: NextPage<HomePageProps> = ({ cotacao: { cotacaoCompra } }) => {
	const [cotacaoDolar, setCotacaoDolar] = useState<number>(cotacaoCompra)
	const [valorConverter, setValorConverter] = useState<number>(0)
	const [valorConvertido, setValorConvertido] = useState<number>(0)

	const atualizaValorConverter = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = parseFloat(e.target.value)
		if (isNaN(value))
			setValorConverter(0)
		setValorConverter(value)
	}

	const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		setValorConvertido(convert(cotacaoDolar, valorConverter))
	}

	return (
		<div className='flex justify-center items-center flex-col w-[100%] h-[100%]'>
			<PageTitle />
			<h1 className='text-center text-2xl font-bold'>
				ConvertMyMoney
			</h1>
			<form onSubmit={onFormSubmit}>
				<div className='flex justify-center flex-col mt-7'>
					<p>
						Cotaçao Dolar: <span className='text-red-600'> R$ {cotacaoDolar}</span>
					</p>
				</div>
				<div className='flex justify-center flex-col mt-7'>
					<label htmlFor="">
						Valor para conversão:
					</label>
					<input
						type="number"
						step='0.01'
						className='border-2 border-gray-600 px-2'
						placeholder='Digite o valor para converter'
						name='valor'
						value={valorConverter}
						onChange={atualizaValorConverter} />
				</div>
				<div className='flex justify-center flex-col mt-7'>
					<button disabled={valorConverter === 0}>
						Converter
					</button>
				</div>
			</form>
			{
				valorConvertido > 0 &&
				<h3 className='text-xl mt-10 text-green-500'>
					Valor convertido: R${toMoney(valorConvertido)}
				</h3>
			}
		</div>
	)
}

export default Home