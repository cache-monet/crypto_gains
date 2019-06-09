const mongoose = require('mongoose')

const MONGO_USER = process.env.MONGO_USER
const MONGO_PASSWORD = process.env.MONGO_PW
const MONGO_HOSTNAME = process.env.MONGO_HOSTNAME
const MONGO_PORT = process.env.MONGO_PORT
const MONGO_DB = process.env.MONGO_DB

console.log(MONGO_HOSTNAME)
const url = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_HOSTNAME}:${MONGO_PORT}/${MONGO_DB}`;

mongoose.connect(url, {useNewUrlParser: true})
.catch(err => {
    if (err) console.error(err);
    else console.log('Connected')
})