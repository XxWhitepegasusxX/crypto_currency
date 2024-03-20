import { geckoApi } from './geckoApi'
import { TrendingCoins } from './types'

export async function getTrending(): Promise<TrendingCoins> {
    const response: TrendingCoins = await geckoApi('/trending')
    return response
}