'use strict'

const express = require('express')
const auth = require('../middlewares/auth')
const usercontroller = require('../controllers/userController')
const productController = require('../controllers/productController')

const api = express.Router()

api.get('/products', productController.getProducts)
api.get('/product/:productId', productController.getProduct)
api.get('/private', auth, usercontroller.isAuthorized)
api.get('/users', usercontroller.getUsers)

api.post('/product', auth, productController.saveProduct)
api.post('/signup', usercontroller.signUp)
api.post('/signin', usercontroller.signIn)

api.put('/product/:productId', auth, productController.updateProduct)

api.delete('/product/:productId', auth, productController.deleteProduct)

module.exports = api