const User = require('../models/user')
import CCC from '../index'

export async function updatePortfolio (req, res) {
    const { username, updates } = req.body
    User.findOne({username: username}, { _id: false, portfolio: true}, (err, user) => {
        updates.forEach( update => {
            const { coin, withdrawal } = update
            let { amount } = update
            if (withdrawal) amount *= -1
            user.portfolio[coin] += amount
        })
        user.save()
        res.send(user)
    })
}

export async function getWallet(req, res) {
    const { username } = req.body
    let { portfolio } = await User.findOne({username: username})
    portfolio = Object.entries(portfolio)
    portfolio = portfolio.filter(e => e[0] != "$init" && e[1]  > 0)
    let coins = []
    portfolio.forEach(e => coins.push(e[0]))
    let prices = await CCC.getPrices(coins)
    let wallet = []
    portfolio.forEach(e => {
        let cv = {}
        let c = e[0], a = e[1]
        let p = prices[c]
        cv[c] = (p*a).toFixed(2)
        wallet.push(cv)
    })
    res.send(wallet)
}
