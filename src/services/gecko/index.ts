import { useQuery } from '@tanstack/react-query'
import { geckoApi } from './geckoApi'
import { ChartResponse, Coin, CoinDetails, QueryCoins, TrendingCoin } from './types'

// GET Trending Crypto

async function getTrending(): Promise<TrendingCoin[]> {
    const { data } = await geckoApi<TrendingCoin[]>('/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false')
    console.log('data:',data)
    return data.slice(0,10)
}

export default function useFetchTrending(){
    return useQuery({
      queryKey: ['coins'],
      queryFn: getTrending
    })
}

// GET Crypto by Id

async function getCoinById(id: string): Promise<CoinDetails>{
    const { data } = await geckoApi.get<CoinDetails>(`/coins/${id}`)
    return data;
}

export function useFetchCoin(id: string){
    return useQuery({
        queryKey: ['coin', id],
        queryFn: ({ queryKey }) => getCoinById(queryKey[1])
    })
}

// GET Crypto Search

async function queryCoins(search: string): Promise<Coin[]>{
    const { data } = await geckoApi.get<QueryCoins>('/search', {
        params: {query: search}
    })
    console.log(data.coins)
    return data.coins.slice(0,10)
}

export function useQueryCoins(search: string){
    return useQuery({
        queryKey: ['coin', search],
        queryFn: ({ queryKey }) => queryCoins(queryKey[1])
    })
}

// GET Market Chart

async function getMarketChart(id: string): Promise<ChartResponse>{
    const {data} = await geckoApi.get<ChartResponse>(`https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=7`)
    return data
}

export function useMarketChart(id: string){
    return useQuery({
        queryKey: ['chart', id],
        queryFn: ({ queryKey }) => getMarketChart(queryKey[1])
    })
}