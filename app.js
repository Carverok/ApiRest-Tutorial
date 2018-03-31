'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const handlebars = require('express-handlebars')
const app = express()
const api = require('./routes/routes')

app.use(bodyParser.urlencoded({extended : false}))
app.use(bodyParser.json())

app.engine('.hbs', handlebars ({
    defaultLayout: 'default',
    extname: '.hbs'
}))

app.set('view engine', '.hbs')

app.use('/api', api)

app.get('/login', (req, res) => {
    res.render('login')
})

app.get('/products', (req, res) => {
    res.render('product')
})

module.exports = app