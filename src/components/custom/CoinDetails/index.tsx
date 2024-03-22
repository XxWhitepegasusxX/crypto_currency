import { useFetchCoin } from "@/services/gecko"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { MarketChart } from "../MarketChart";
import { Separator } from "@/components/ui/separator";
  
interface CoinDetailsProps{
    id?: string,
}


export function CoinDetails({id = 'bitcoin'}: CoinDetailsProps){
    
    const { data: coin } = useFetchCoin(id)
    if (!coin) {
        return <div className="w-full h-screen flex items-center justify-center text-xl">Loading...</div>;
    }

    return (
        <section className="w-full flex flex-col gap-5 mb-10">
            <div className="container grid md:grid-cols-3 gap-8 items-start py-8">
                <div className="md:col-span-2">
                    <h2 className="text-4xl font-bold leading-tight mb-4">{coin.name}</h2>
                    {/* biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation> */}
                    <p className="text-gray-600 text-base leading-relaxed" dangerouslySetInnerHTML={{ __html: coin.description.en }}/>
                </div>
                <div className="flex justify-center md:justify-end">
                    <img
                    alt="Coin Logo"
                    className="w-10/12 animate-pulse"
                    src={coin.image.large}
                    />
                </div>
            </div>
            <Separator className="max-w-xl mx-auto"/>
            <MarketChart id={id}/>
            <Separator className="max-w-5xl mx-auto"/>
            <div className="w-full flex flex-col items-center gap-4 justify-center">
                <h2 className="font-bold text-3xl">Details</h2>
                <Table className="max-w-lg mx-auto">
                    <TableCaption>Total market cap</TableCaption>
                    <TableHeader>
                        <TableRow className="flex justify-between">
                            <TableHead className="w-[100px]">Market Cap Rank</TableHead>
                            <TableHead>{coin.market_cap_rank}</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow className="flex justify-between">
                            <TableCell className="font-medium">24H High</TableCell>
                            <TableCell>${coin.market_data.high_24h.usd}</TableCell>
                        </TableRow>
                        <TableRow className="flex justify-between">
                            <TableCell className="font-medium">24H Low</TableCell>
                            <TableCell>${coin.market_data.low_24h.usd}</TableCell>
                        </TableRow>
                        <TableRow className="flex justify-between">
                            <TableCell className="font-medium">Circulating Supply</TableCell>
                            <TableCell>${coin.market_data.circulating_supply}</TableCell>
                        </TableRow>
                        <TableRow className="flex justify-between">
                            <TableCell className="font-medium">Current Price</TableCell>
                            <TableCell>${coin.market_data.current_price.usd}</TableCell>
                        </TableRow>
                        <TableRow className="flex justify-between">
                            <TableCell className="font-medium">Change (1 Year)</TableCell>
                            <TableCell style={{ color: coin.market_data.price_change_percentage_1y >= 0 ? 'green' : 'red' }}>
                                {coin.market_data.price_change_percentage_1y.toFixed(2)}%
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>

            </div>
        </section>
    )
}