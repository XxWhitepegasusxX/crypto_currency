import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const mockedCryptoCoins = [
  { name: "Bitcoin", symbol: "BTC", price: "$47,000", change: "+2%" },
  { name: "Ethereum", symbol: "ETH", price: "$3,500", change: "-1%" },
  { name: "Cardano", symbol: "ADA", price: "$2.5", change: "+5%" },
  { name: "Solana", symbol: "SOL", price: "$150", change: "+3%" },
];

export function TrendingList() {
  return (
    <div className="flex flex-col w-full min-h-screen">
      <main className="flex-1">
        <div className="grid gap-6 max-w-6xl w-full mx-auto p-4 md:gap-8 md:p-10">
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-bold">Cryptocurrencies</h1>
            <p className="text-gray-500 dark:text-gray-400">Real-time cryptocurrency data</p>
          </div>
          <div className="flex w-full items-center space-x-2">
            <Input type="search" placeholder="Type a crypto..." />
            <Button type="submit">Search</Button>
          </div>
          <div className="flex flex-col gap-2">
            <Button variant="outline">Refresh</Button>
          </div>
          <div className="flex flex-col gap-2">
            <div className="overflow-auto border sm:rounded-lg">
              <Table className="w-full">
                <TableCaption>Trending Crypto</TableCaption>
                <TableHeader className="w-full">
                  <TableRow className="">
                    <TableHead className="text-center" >Name</TableHead>
                    <TableHead className="text-center" >Symbol</TableHead>
                    <TableHead className="text-center" >Price</TableHead>
                    <TableHead className="text-center" >Change</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockedCryptoCoins.map((coin, index) => (
                    <TableRow className="w-full" key={index + coin.name}>
                      <TableCell className="text-center">{coin.name}</TableCell>
                      <TableCell className="text-center">{coin.symbol}</TableCell>
                      <TableCell className="text-center">{coin.price}</TableCell>
                      <TableCell className="text-center">{coin.change}</TableCell>
                    </TableRow>              
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
