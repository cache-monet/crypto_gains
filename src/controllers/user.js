const User = require('../models/user')
import CCC from '../index'

export async function getUsers(req, res) {
    User.find({},(err, users) => {
        let uMap = {}
        users.forEach(u => {
            uMap[u.email] = u
        })
        res.send(uMap)
    })
}

export async function createUser(req, res) {
    const { username, email, password } = req.body
    let u = new User({
        username: username,
        email: email,
        password: password,
        portfolio: {
            "BTC": 0, 
            "ETH": 0, 
            "XRP": 0, 
            "LTC": 0, 
            "BCH": 0, 
            "EOS": 0, 
            "TRX": 0, 
            "XMR": 0, 
            "XLM": 0, 
            "DASH": 0
        }
    })

    u.save(err => {
        if (err) throw err
        res.send('User created!')
    })
}

export async function updatePortfolio (req, res) {
    const { username, request} = req.body
    const { coin, withdrawal } = request
    let { amount } = request
    if (withdrawal) amount *= -1
    User.findOne({username: username}, { portfolio: true}, (err, user) => {
        user.portfolio[coin] += amount
        user.save()
        res.send(user)
    })
}

export async function getPortfolio(req, res) {
    const { username } = req.body
    let { portfolio } = await User.findOne({username: username})
    portfolio = Object.entries(portfolio)
    portfolio = portfolio.filter(e => e[0] != "$init" && e[1]  > 0)
    let coins = []
    let amount = []
    portfolio.forEach(e => {
        coins.push(e[0])
        amount.push(e[1])
    })
    let prices = await CCC.getPrices(coins)
    amount.map()
    res.send(portfolio)
}

async function getPrices() {

} 

async function getCoins(user) {
    console.log(portfolio)
    let coins = []
    for(let [c, amnt] in Object.entries(portfolio)) {
        if (amnt > 0) coins[c] = amnt
    }
    return coins
}