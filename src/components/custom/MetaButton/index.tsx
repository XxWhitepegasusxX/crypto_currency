import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useMetaMask } from "metamask-react";

interface MetaButtonProps{
    balance: string
}

export function MetaButton({balance = '0.00'}: MetaButtonProps){
    const { connect, account } = useMetaMask();

    if (!account) return (
        <Button onClick={connect}>Connect Meta-Mask</Button>
    )
    if(account) return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline">{account.slice(0, 10)}...</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>Wallet Balance</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                    ${balance}
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}