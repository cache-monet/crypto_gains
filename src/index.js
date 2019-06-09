const express = require('express')
const bodyParser = require('body-parser')
require('dotenv').config()

import { getUsers, createUser, updatePortfolio, getWallet } from './controllers/user'
import CryptoCompareConnector from './CryptoCompareConnect'
const db = require('./db')
const app = express()
const port = 3000


app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
)

app.get('/users', getUsers)
app.get('/user', getWallet)
app.put('/user', updatePortfolio)
app.post('/user', createUser)

app.listen(port, () => console.log(`Crypto Gains is live on port ${port}!`))

const CCC = new CryptoCompareConnector(process.env.CryptoCompareKey, 'CAD')

export default CCC