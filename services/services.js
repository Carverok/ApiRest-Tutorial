'use strict'

const jwt = require ('jwt-simple')
const moment = require('moment')
const config = require('../config')

function createToken(user) {
    const payload = {
        sub: user._id,
        iat: moment().unix(),
        exp: moment().add(14, 'days').unix()
    }

    return jwt.encode(payload, config.TOKEN)
}

function decodeToken(token){    
    const promise = new Promise((resolve, reject) => {
        try {
            const payload = jwt.decode(token, config.TOKEN)

            if (reject.exp <= moment().unix()){
                resolve({
                    status: 401,
                    message: `Token has been expired.`
                })
            }
            
            resolve(payload.sub)
        } catch (exception) {
            reject({
                status: 500,
                message: `Invalid token`
            })
        }
    })
}

module.exports = {
    createToken,
    decodeToken
}