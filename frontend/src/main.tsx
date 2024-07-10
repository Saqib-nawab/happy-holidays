import React from 'react'
import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from "react-query";
import { AppContextProvider } from "./contexts/AppContexts.tsx";
import App from './App.tsx'
import './index.css'


//this will be provided to the entire application
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
    },
  },
});


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
         <AppContextProvider>
          <App />
      </AppContextProvider>
    </QueryClientProvider>
  </React.StrictMode>,
)
