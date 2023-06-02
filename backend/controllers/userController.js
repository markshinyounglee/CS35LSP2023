const User = require('../models/userModel.js')
const mongoose = require('mongoose')

//get all users
const getUsers = async(req, res) =>{
    const users = await User.find({}).sort({createdAt: -1})

    res.status(200).json(users)
}
const getUser = async(req, res) =>{
  const {id} = req.params
    const user = await User.findById(id)

    if (!user) {
        return res.status(404).json({error: 'No such user'})
    }
    res.status(200).json(user)
}

const createUser = async (req, res) => {
    const { usrname, pswd, friendlist, blocklist, mybeefs } = req.body;
    //add doc to database
    try {
      if (mongoose.connection.readyState !== 1) {
        throw new Error('MongoDB connection is not ready');
      }
    
      const user = await User.create({
        usrname,
        pswd,
        friendlist,
        blocklist,
        mybeefs
      });
      res.status(200).json(user);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }}

module.exports = {
    getUsers,
    getUser,
    createUser
}