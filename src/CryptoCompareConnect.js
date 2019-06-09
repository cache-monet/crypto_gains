import axios from 'axios'
import memoize from 'memoizee'

const CoinLibrary = ['BTC', 'ETH', 'XRP', 'BCH', 'EOS', 'TRX', 'XMR', 'XLM', 'LTC', 'DASH']

export default class CryptoCompareConnector {
    constructor(apiKey, fiat='USD') {
        this.client = axios.create({
            baseURL: 'https://min-api.cryptocompare.com/data',
            method: 'get',
            responseType: 'json',
            headers: {'Apikey': apiKey}
        })
        this.fiat = fiat
        this.getPricesCached = memoize(
            this.fetchPrices,
            {
                maxAge: 60000,
                preFetch: 0.05,
                promise: 'then'
            }
        )
    }

    async getPrices(coinQuery) {
        const prices = await this.getPricesCached()
        // let coins = []
        return coinQuery.reduce((coin, c) => {
            coin[c] = prices[c][this.fiat]
            return coin
        }, {})
    }
    async fetchPrices() {
        let coins = CoinLibrary.join(',') 
        const res = await this.client(`/pricemulti?fsyms=${coins}&tsyms=${this.fiat}`)
        return await res.data
    }
    async setFiat(newFiat) {
        this.fiat = newFiat
    }
    async getFiat() {
        return this.fiat
    }
}
