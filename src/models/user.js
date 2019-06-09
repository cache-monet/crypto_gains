const mongoose = require('mongoose')

const Schema = mongoose.Schema

const user = new Schema ({
    username: {type: String, required: true, unique: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    portfolio: {
        BTC: Number,
        ETH: Number,
        XRP: Number,
        DASH: Number,
        LTC: Number,
        BCH: Number,
        EOS: Number,
        TRX: Number,
        XMR: Number,
        XLM: Number,
    }
})

const User = mongoose.model('User', user)
module.exports = User