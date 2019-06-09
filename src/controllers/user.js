const User = require('../models/user')

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
            "BTC": 0, "ETH": 0, "XRP": 0,
            "LTC": 0, "BCH": 0, "EOS": 0,
            "TRX": 0, "XMR": 0, "XLM": 0,
            "DASH": 0
        }
    })

    u.save(err => {
        if (err) throw err
        res.send('User created!')
    })
}
