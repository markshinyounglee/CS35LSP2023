const express = require('express')
const {
  createBeef, 
  getBeef,
  getBeefs,
  deleteBeef,
  updateBeef
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
router.delete('/:id', deleteBeef)
//UPDATE a beef
router.patch('/:id', updateBeef)
module.exports = router