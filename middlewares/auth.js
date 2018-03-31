'use strict'

const services = require('../services/services')

function isAuth (req, res, next) {
    if (!req.headers.autorization) {
        return res.status(403).send({ message: `forbidden`})
    }
    
    const token = req.headers.autorization.split(" ")[1]  
    
    services.decodeToken(token)
        .then(response => {
            req.user = response
            next()
        })
        .catch(response => {
            res.status(response.status).send(response.message)
        })
}

module.exports = isAuth