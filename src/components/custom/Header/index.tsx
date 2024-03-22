import { Link } from "react-router-dom";
import { Gem } from 'lucide-react';
import { MetaButton } from "../MetaButton";

interface HeaderProps{
    balance?: string
}

export default function Header({balance = '0.00'}: HeaderProps){
    return (
        <header className="flex w-full justify-between p-6 px-6 sm:px-10">
                <Link to={'/'}>
                    <div className="flex items-center gap-2">
                        <Gem/>
                        <h2 className="font-bold text-2xl text-nowrap hidden sm:inline">Crypto Currency</h2>
                        <h2 className="font-bold text-2xl text-nowrap sm:hidden">CC</h2>
                    </div>
                </Link>
                <MetaButton balance={balance}/>
        </header>
    ) 
}