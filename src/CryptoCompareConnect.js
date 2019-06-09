import axios from 'axios'

export default class CryptoCompareConnector {
    constructor(apiKey, fiat='USD') {
        this.client = axios.create({
            baseURL: 'https://min-api.cryptocompare.com/data',
            method: 'get',
            responseType: 'json',
            headers: {'Apikey': apiKey}
        })
        this.fiat = fiat
    }
    async getPrices(coins) {
        let cs = coins.reduce((acc, c) => acc + c + ',', '').toUpperCase()
        const res = await this.client(`/pricemulti?fsyms=${cs}&tsyms=${this.fiat}`)
        const data = await res.data
        return data
    }
    async setFiat(newFiat) {
        this.fiat = newFiat
    }
}
