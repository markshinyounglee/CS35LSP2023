
const express = require('express')
const router = express.Router()

//Get all Beefs
router.get('/', (req, res) => {
    res.json({mssg: 'GET all beefs'})
})

//GET a single beef
router.get('/:id', (req, res) => {
    res.json({mssg: 'GET a single beef'})
})

//POST a new beef
router.post('/', (req, res) => {
    res.json({mssg: 'POST a new beef'})
})

//DELETE a beef
router.delete('/:id', (req, res) => {
    res.json({mssg: 'DELETE a beef'})
})
//UPDATE a beef
router.patch('/:id', (req, res) => {
    res.json({mssg: 'UPDATE a beef'})
})
module.exports = router