const express = require('express')
const {
  createBeef, 
  getBeef,
  getBeefs
} = require('../backend/controllers/beefController')
// const Beef = require('../backend/models/beefModel')
const router = express.Router()
const mongoose = require('mongoose')

//Get all Beefs
router.get('/', getBeefs)

//GET a single beef
router.get('/:id', getBeef)

//POST a new beef
router.post('/', createBeef)

//DELETE a beef
router.delete('/:id', (req, res) => {
    res.json({mssg: 'DELETE a beef'})
})
//UPDATE a beef
router.patch('/:id', (req, res) => {
    res.json({mssg: 'UPDATE a beef'})
})
module.exports = router