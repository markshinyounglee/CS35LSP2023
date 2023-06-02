const express = require('express')
const {
    createUser,
    getUsers, 
    getUser
} = require('../backend/controllers/userController')

const router2 = express.Router()
const mongoose = require('mongoose')

//Get all Beefs
router2.get('/', getUsers)

router2.get('/:id', getUser)

//POST a new beef
router2.post('/', createUser)

module.exports = router2
