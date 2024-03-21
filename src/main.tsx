import ReactDOM from 'react-dom/client'
import App from './pages/App.tsx'
import CoinDetail from './pages/CoinDetail.tsx'
import '@/styles/index.css'
import { QueryClientProvider } from "@tanstack/react-query"
import { queryClient } from './lib/react-query.ts'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { MetaMaskProvider } from "@metamask/sdk-react";
import { MetaMaskProvider as Provider } from "metamask-react";

// biome-ignore lint/style/noNonNullAssertion: <explanation>
ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider>
    <MetaMaskProvider debug={false} sdkOptions={{
      dappMetadata: {
        name: "Example React Dapp",
        url: window.location.href,
      },
    }}
    >
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route index element={<App/>}/>
            <Route path='/:id' element={<CoinDetail/>}/>
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </MetaMaskProvider>
    </Provider>
)
