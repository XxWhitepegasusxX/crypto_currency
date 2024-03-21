import { create } from 'zustand'

interface AccountProps{
    address: string,
    balance: {
        ethereum: number,
    }
}

export const useAccountStore = create((set) => ({
    account: {
      address: '',
      balance: {
        ethereum: 0, // Initialize balance to 0
      },
    },
    connectAccount: (data: AccountProps) => set((state: {account: AccountProps}) => ({ account: { ...state.account, ...data } })),
    disconnectAccount: () => set({ account: { address: '', balance: { ethereum: 0 } } }),
  }));
  