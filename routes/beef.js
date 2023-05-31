
const express = require('express')
const Beef = require('../backend/models/beefModel')
const router = express.Router()
const mongoose = require('mongoose')

//Get all Beefs
router.get('/', (req, res) => {
    res.json({mssg: 'GET all beefs'})
})

//GET a single beef
router.get('/:id', (req, res) => {
    res.json({mssg: 'GET a single beef'})
})

//POST a new beef
router.post('/', async (req, res) => {
  const { title, id, description, votesForUser1, votesForUser2 } = req.body;

  try {
    if (mongoose.connection.readyState !== 1) {
      throw new Error('MongoDB connection is not ready');
    }

    const beef = await Beef.create({
      title,
      id,
      description,
      votesForUser1,
      votesForUser2,
    });
    res.status(200).json(beef);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

//DELETE a beef
router.delete('/:id', (req, res) => {
    res.json({mssg: 'DELETE a beef'})
})
//UPDATE a beef
router.patch('/:id', (req, res) => {
    res.json({mssg: 'UPDATE a beef'})
})
module.exports = router