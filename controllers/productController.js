'use strict'

//database model
const productModel = require('../models/productModel')

//get product by id
function getProduct(req, res) {
    let productId = req.params.productId

    productModel.findById(productId, (err, product) => {
        if (err) return res.status(500).send({message: `Database error: ${err}`})

        if (!product) return res.status(404).send({message: `Id ${productId} doesn't exists.`})

        res.status(200).send({product})
    })
}

//get all product
function getProducts(req, res) {
    productModel.find({}, (err, products) => {
        if (err) return res.status(500).send({message: `Database error: ${err}`})

        if (products.length == 0) return res.status(404).send({message: `There is no products to show.`})

        res.status(200).send({products})
    })
}

//insert product
function saveProduct(req, res) {
    let product = new productModel()
    product.name = req.body.name
    product.picture = req.body.picture
    product.price = req.body.price
    product.category = req.body.category
    product.description = req.body.description

    product.save((err, productStored) => {
        if (err) res.status(500).send( {message: `Database save error: ${err}`})

        res.status(200).send({product: productStored})
    })
}

//update prodyct by id
function updateProduct(req, res) {
    let productId = req.params.productId    
    let params = req.body
    
    productModel.findByIdAndUpdate(productId, params, (err, productUpdated) => {
        if (err) return res.status(500).send({message: `Database error: ${err}`})

        if (!productUpdated) return res.status(404).send({message: `Id ${productId} doesn't exists.`})

        res.status(200).send({ product :productUpdated})
    })
}

//remove product by id
function deleteProduct(req, res) {
    let productId = req.params.productId

    productModel.findById(productId, (err, product) => {
        if (err) return res.status(500).send({message: `Database error: ${err}`})

        if (!product) return res.status(404).send({message: `Id ${productId} doesn't exists.`})

        product.remove(err => {
            if (err) return res.status(500).send({message: `Database error: ${err}`})

            res.status(200).send({message: `Product: ${productId} has been removed.`})
        })        
    })
}

module.exports = {
    getProduct,
    getProducts,
    saveProduct,
    updateProduct,
    deleteProduct
}