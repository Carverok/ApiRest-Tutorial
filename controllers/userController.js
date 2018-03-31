'use strict'

const mongoose = require('mongoose')
const userModel = require('../models/userModel')
const service = require('../services/services')

function signUp (req, res){
    const user = new userModel({
        email: req.body.email,
        displayName: req.body.displayName
    })

    user.save((err) => {
        if (err) return res.status(500).send({message: `Cannot create user ${user.displayName}, error: ${err}`})

        res.status(200).send({token: service.createToken(user)})
    })
}

function signIn (req, res) {
    let email = req.body.email
    userModel.find({email: email}, (err, user) => {
        if (err) return res.status(500).send({message: err})
        if (!user) return res.status(404).send({message: `User doesn't exists.`})

        req.user = user
        res.status(200).send({
            message: `Login OK`,
            token: service.createToken(user),
            user: user
        })
    })
}

function isAuthorized(req, res) {
    res.status(200).send({message: `OK`})
}

function getUsers(req, res) {
    userModel.find({}, (err, users) => {
        if (err) return res.status(500).send({message: `Database error: ${err}`})
        if (users.length == 0) return res.status(404).send({message: `There is no users to show.`})

        res.status(200).send({users})
    })   
}

module.exports = {
    signUp,
    signIn,
    isAuthorized,
    getUsers
}