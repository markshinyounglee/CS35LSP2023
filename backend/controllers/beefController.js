const Beef = require('../models/beefModel')
const mongoose = require('mongoose')

//get all beefs
const getBeefs = async (req, res) => { 
    const beefs = await Beef.find({}).sort({createdAt: -1})

    res.status(200).json(beefs)
}

//get a single beef
const getBeef = async (req, res) => { 
    const {id} = req.params
    const beef = await Beef.findById(id)

    if (!beef) {
        return res.status(404).json({error: 'No such beef'})
    }
    res.status(200).json(beef)
}

// create new beef
const createBeef = async (req, res) => {
const { title, description, votesForUser1, votesForUser2, user1, user2 } = req.body;
//add doc to database
try {
  if (mongoose.connection.readyState !== 1) {
    throw new Error('MongoDB connection is not ready');
  }

  const beef = await Beef.create({
    title,
    description,
    votesForUser1,
    votesForUser2,
  });
  res.status(200).json(beef);
} catch (error) {
  res.status(400).json({ error: error.message });
}}
// delete a beef
const deleteBeef = async (req, res) => {
  const {id} = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such beef'})
  }

  const beef = await Beef.findOneAndDelete({_id: id})

  if (!beef) {
    return res.status(404).json({error: 'No such beef'})
  }

  res.status(200).json(beef)
}

//update a beef 

const updateBeef = async (req, res) => {
  const {id} = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such beef'})
  }

  const beef = await Beef.findOneAndUpdate({_id: id},{
    ...req.body
  })

  if (!beef) {
    return res.status(404).json({error: 'No such beef'})
  }

  res.status(200).json(beef)
}


module.exports = {
    createBeef,
    getBeef,
    getBeefs,
    deleteBeef,
    updateBeef
}