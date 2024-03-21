import axios from "axios";

export const geckoApi = axios.create({
    baseURL: 'https://api.coingecko.com/api/v3/',
    headers: {
        'x-cg-demo-api-key': import.meta.env.VITE_CRYPTO_API_KEY
    }
})