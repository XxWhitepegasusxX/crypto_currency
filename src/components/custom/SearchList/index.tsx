import { Coin } from "@/services/gecko/types";
import { useNavigate } from "react-router-dom";

interface SearchListInterface{
    data?: Coin[]
}

export function SearchList({data}: SearchListInterface){
    const navigate = useNavigate()

    return(
        <div className="w-[60vw] bg-white my-2 z-10 fixed border rounded flex flex-col">
            {data?.map(coin => (
                <div onClick={() => navigate(`/${coin.id}`)} onKeyUp={() => navigate(`/${coin.id}`)} className="flex gap-5 w-full hover:bg-neutral-300 p-4 h-full items-center">
                    <div className="flex gap-2 items-center">
                        <img src={coin.thumb} className="w-4 h-4" alt="coin"/>
                        <p>{coin.symbol}</p>
                    </div>
                    <p>{coin.name}</p>
                </div>
            ))}
        </div>
    )
}