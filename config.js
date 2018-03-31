'use strict'

const port = process.env.PORT || 3001
const db = process.env.MONGODB || 'mongodb://localhost:27017/shop'
const TOKEN = 'myAuthenticationToken'

module.exports = {
    port,
    db,
    TOKEN
}