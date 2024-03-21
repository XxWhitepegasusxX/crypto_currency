import { CoinDetails } from "@/components/custom/CoinDetails";
import Header from "@/components/custom/Header";
import { useParams } from 'react-router-dom'

export default function CoinDetail(){

    const { id } = useParams()

    return(
        <>
        <Header/>
        <CoinDetails id={id}/>
        </>
    )
}