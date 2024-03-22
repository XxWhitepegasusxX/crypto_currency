/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {useState, useEffect } from 'react'
import Header from '../components/custom/Header'
import { TrendingList } from '../components/custom/TrendingList'
import { Toaster } from "@/components/ui/toaster"

import { formatBalance } from '../utils'
import detectEthereumProvider from '@metamask/detect-provider'

const App = () => {
  const initialState = { accounts: [], balance: "", chainId: "" }
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  const  [wallet, setWallet] = useState<typeof initialState | any>(initialState)
  
  useEffect(() => {
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    const refreshAccounts = (accounts: any) => {
      if (accounts.length > 0) {
        updateWallet(accounts)
      } else {
        // if length 0, user is disconnected
        setWallet(initialState)
      }
    }

    const refreshChain = (chainId: any) => {
      setWallet((wallet: any) => ({ ...wallet, chainId }))
    }

    const getProvider = async () => {
      const provider = await detectEthereumProvider({ silent: true })

      if (provider && window.ethereum) {
        const accounts = await window.ethereum.request(
          { method: 'eth_accounts' }
        )
        refreshAccounts(accounts)
        window.ethereum.on('accountsChanged', refreshAccounts)
        window.ethereum.on("chainChanged", refreshChain)
      }
    }

    getProvider()

    return () => {
      window.ethereum?.removeListener('accountsChanged', refreshAccounts)
      window.ethereum?.removeListener("chainChanged", refreshChain)
    }
  }, [])

  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
const  updateWallet = async (accounts: any) => {
    const balance = formatBalance(await window.ethereum?.request({
      method: "eth_getBalance",
      params: [accounts[0], "latest"],
    }))
    const chainId = await window.ethereum?.request({
      method: "eth_chainId",
    })
    setWallet({ accounts, balance, chainId })
  }



  return (
    <>
      <Toaster/>
      <Header balance={wallet.balance}/>
      <TrendingList/>
    </>
  )
}

export default App
