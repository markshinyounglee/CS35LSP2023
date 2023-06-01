const express = require('express')
const {
    createUser,
    getUsers
} = require('../backend/controllers/userController')

const router2 = express.Router()
const mongoose = require('mongoose')

//Get all Beefs
router2.get('/', getUsers)

//POST a new beef
router2.post('/', createUser)

module.exports = router2
