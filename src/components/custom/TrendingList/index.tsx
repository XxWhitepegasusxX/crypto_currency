/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import useFetchTrending, { useQueryCoins } from "@/services/gecko";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { SearchList } from "../SearchList";

export function TrendingList() {
  const navigate = useNavigate()
  const { data: coins, isLoading, refetch: refresh } = useFetchTrending();
  const { toast } = useToast()
  const [search, setSearch] = useState<string>('')
  const { data: searchCoins, refetch } = useQueryCoins(search)

  function handleRefresh(){
    refresh()
    toast({
      title: "Refreshing",
      description: "Crypto List is Refreshing",

    })
  }

  function handleSearch(){
    refetch()
    toast({
      title: `Searching by ${search}`
    })
  }

  return (
    <div className="flex flex-col w-full min-h-screen">
      <main className="flex-1">
        <div className="grid gap-6 max-w-6xl w-full mx-auto p-4 md:gap-8 md:p-10">
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-bold">Cryptocurrencies</h1>
            <p className="text-gray-500 dark:text-gray-400">Real-time cryptocurrency data</p>
          </div>
          <div className="w-full items-center relative">
            <div className="flex w-full space-x-2">
              <Input value={search} onChange={(e) => setSearch(e.target.value)} type="search" placeholder="Type a crypto..." />
              <Button type="submit" onClick={handleSearch}>Search</Button>
            </div>
            {searchCoins && searchCoins.length > 0 && (
              <SearchList data={searchCoins} />
            )}
          </div>
          <div className="flex flex-col gap-2">
            <Button variant="outline" onClick={handleRefresh}>Refresh</Button>
            {isLoading && <p className="font-bold mx-auto">Loading...</p>}
          </div>
          <div className="flex flex-col gap-2">
            <div className="overflow-auto border sm:rounded-lg">
              <Table className="w-full">
                <TableCaption>Top 10 Trending Crypto</TableCaption>
                <TableHeader className="w-full">
                  <TableRow className="">
                    <TableHead className="text-center" >Symbol</TableHead>
                    <TableHead className="text-center" >Name</TableHead>
                    <TableHead className="text-center" >Price</TableHead>
                    <TableHead className="text-center" >Change</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {!isLoading && (
                    coins?.map((coin, index) => (
                        <TableRow className="w-full cursor-pointer" key={index + coin.name} onClick={() => navigate(`/${coin.id}`)}>
                          <TableCell className="text-center">
                            <div className="flex gap-2 items-center justify-center">
                            <img src={coin.image} alt="Coin" className="w-4 h-4" />
                            <p>{coin.symbol.toLocaleUpperCase()}</p>
                            </div>
                          </TableCell>
                          <TableCell className="text-center">{coin.name}</TableCell>
                          <TableCell className="text-center">${coin.current_price}</TableCell>
                          <TableCell className={`text-center ${coin.price_change_percentage_24h >= 0 ? 'text-green-500' : 'text-red-500'}`}>{coin.price_change_percentage_24h >= 0 ? '+' : ''}{Math.round(coin.price_change_percentage_24h)}%</TableCell>
                        </TableRow>              
                    ))
                    )
                  }
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

