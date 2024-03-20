import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './pages/App.tsx'
import '@/styles/index.css'
import { QueryClientProvider } from "@tanstack/react-query"
import { queryClient } from './lib/react-query.ts'

// biome-ignore lint/style/noNonNullAssertion: <explanation>
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>,
)
