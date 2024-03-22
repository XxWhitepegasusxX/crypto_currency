/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import detectEthereumProvider from "@metamask/detect-provider";
import { toast } from '@/components/ui/use-toast';
import { formatBalance } from '@/utils';

interface AccountProps{
    accounts: string[],
    balance: string,
    chainId: string
}

export function MetaButton(){
    const [hasProvider, setHasProvider] = useState<boolean | null>(null);
    const initialState: AccountProps = {
        accounts: [],
        balance: "",
        chainId: "",
    };

    const [wallet, setWallet] = useState(initialState);
    const [isConnecting, setIsConnecting] = useState(false);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");


    useEffect(() => {

        const refreshAccounts = (accounts: string[]) => {
            if (accounts.length > 0) {       
                updateWallet(accounts);
            } else {
                // if length 0, user is disconnected            
                setWallet(initialState);                        
            }                                                   
        };

        const refreshChain = (chainId: string) => {
            setWallet((wallet) => ({ ...wallet, chainId }));
        };                                                     

        const getProvider = async () => {
            const provider = await detectEthereumProvider({ silent: true });
            // transform provider to true or false
            setHasProvider(Boolean(provider));
            if (provider) {                                       
                const accounts = await window.ethereum.request(   
                    { method: "eth_accounts" }                    
                );                                                
                refreshAccounts(accounts);                        
                window.ethereum.on("accountsChanged", refreshAccounts);
                window.ethereum.on("chainChanged", refreshChain);                                       
            }
        };

        getProvider();

        return () => {                                            
            window.ethereum?.removeListener("accountsChanged", refreshAccounts);
            window.ethereum?.removeListener("chainChanged", refreshChain);
        };  
    }, []);

    const updateWallet = async (accounts: string[]) => {
        const balance = formatBalance(
            await window.ethereum?.request({
                method: "eth_getBalance",
                params: [accounts[0], "latest"],
            })
        );
        const chainId = await window.ethereum?.request({
            method: "eth_chainId",
        });
        setWallet({ accounts, balance, chainId });
    };                                                 

    const handleConnect = async () => {
        setIsConnecting(true);
        if(!hasProvider){
            toast({
                title: 'Provider not found',
                description: 'Please install a provider in your browser',
                variant: 'destructive'
            })
        }
        await window.ethereum
            .request({
                method: "eth_requestAccounts",
            })
            .then((accounts: []) => {
                setError(false);
                updateWallet(accounts);
            })
            .catch((err: Error) => {
                setError(true);
                setErrorMessage(err.message);
                toast({
                    title: err.name,
                    description: errorMessage,
                    variant: 'destructive'
                })
            });
        setIsConnecting(false);
    };

    if(error){
        toast({
            title: errorMessage,
            variant: 'destructive'
        })
    }
                   

    const disableConnect = Boolean(wallet) && isConnecting;

    if (window.ethereum?.isMetaMask && wallet.accounts.length < 1) return (
        <Button disabled={disableConnect} onClick={handleConnect}>Connect Meta-Mask</Button>
    )

    if(wallet.accounts.length > 0) return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline">{wallet.accounts[0].slice(0,10)}...</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>Wallet Balance</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                    ${wallet.balance}
                </DropdownMenuItem>
                <DropdownMenuLabel>Hex Chain ID</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                    ${wallet.chainId}
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}