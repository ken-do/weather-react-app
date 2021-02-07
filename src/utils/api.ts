import axios, { AxiosRequestConfig } from 'axios'

const defaultConfig: AxiosRequestConfig = {
    baseURL: process.env.REACT_APP_BASE_API_URL,
    timeout: 2500,
    headers: {
        Accepts: 'application/json',
        'Content-Security-Policy':
            "default-src 'self' metaweather.com *.metaweather.com",
    },
}

const api = axios.create(defaultConfig)

export default api
