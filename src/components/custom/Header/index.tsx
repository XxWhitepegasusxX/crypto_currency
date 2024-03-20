import { Button } from "../../ui/button"
import { Gem } from 'lucide-react';

export default function Header(){
    return (
        <header className="flex w-full justify-between p-6 px-6 sm:px-10">
                <div className="flex items-center gap-2">
                    <Gem/>
                    <h2 className="font-bold text-2xl text-nowrap hidden sm:inline">Crypto Currency</h2>
                    <h2 className="font-bold text-2xl text-nowrap sm:hidden">CC</h2>
                </div>
                <Button>Connect Meta-Mask</Button>
        </header>
    ) 
}