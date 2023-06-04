const User = require('../models/userModel.js')
const mongoose = require('mongoose')



//get all beefs of a user by their id
const getAllBeefsOfUser = async(req, res) => {
  const{id} = req.params
  const user = await User.findById(id)
  if (!user) {
    return res.status(404).json({error: 'No such user'})
  }
  res.status(200).json(user.mybeefs)
}

//get all users
const getUsers = async(req, res) =>{
    const users = await User.find({}).sort({createdAt: -1})
    res.status(200).json(users)
}
// get user by ID
const getUser = async(req, res) =>{
  const {id} = req.params
    const user = await User.findById(id)

    if (!user) {
        return res.status(404).json({error: 'No such user'})
    }
    res.status(200).json(user)
}

//TO-DO : MAKE IT SO CREATING A USER WITH AN EXISTING USERNAME FAILS
const createUser = async (req, res) => {
    const { usrname, pswd, friendlist, blocklist, mybeefs, s_requests, r_requests } = req.body;
    //add doc to database
    const existing_user = await User.findOne({"usrname" : req.body.usrname})
    if (existing_user) {
      return res.status(400).json({error: "This username is taken."});
    }
    try {
      if (mongoose.connection.readyState !== 1) {
        throw new Error('MongoDB connection is not ready');
      }
    
      const user = await User.create({
        usrname,
        pswd,
        friendlist,
        blocklist,
        mybeefs,
        s_requests,
        r_requests
      });
      res.status(200).json(user);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }}

const changeUserPswd = async (req, res) => {
  const {id} = req.params 

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such user'})
  }

  const user = await User.findOneAndUpdate({_id: id},{
    pswd: req.body.pswd},
    {new: true}
  );

  if (!user) {
    return res.status(404).json({error: 'No such user'})
  }

  res.status(200).json(user)
}

//MAKE IT SO ADDING AN EXISTING FRIEND FAILS
const addUserFriend = async (req, res) => {
  const {id} = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such user'})
  }

  const user = await User.findOneAndUpdate({_id: id}, {
    $addToSet: { friendlist: req.body.friendlist } },
    {new: true}
  );
  
  if (!user) {
    return res.status(404).json({error: 'No such user'})
  }

  res.status(200).json(user)
}

//MAKE IT SO BLOCKING AN EXISTING BLOCK FAILS
const addUserBlock = async (req, res) => {
  const {id} = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such user'})
  }

  const user = await User.findOneAndUpdate({_id: id}, {
    $addToSet: { blocklist: req.body.blocklist } },
    {new: true}
  );
  if (user.friendlist.includes(req.body.blocklist)) {
    user.friendlist.pull(req.body.blocklist);
  }
  if (!user) {
    return res.status(404).json({error: 'No such user'})
  }

  res.status(200).json(user)
}

//NOTE : FOR SOME REASON THIS ONLY WORKS IF YOU USE IT TWICE
//TODO : DELETE THIS USER FROM ALL OTHER USERS' FRIENDLISTS AND BLOCKLISTS
const deleteUser = async(req, res) => {
  const {id} = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such user'})
  }
  const user = await User.findOneAndDelete({_id : id})
 
  res.status(200).json(user)
}

module.exports = {
    getUsers,
    getUser,
    createUser,
    changeUserPswd,
    addUserFriend,
    addUserBlock,
<<<<<<< HEAD
    getUserByName,
<<<<<<< HEAD
    getAllBeefsOfUser
=======
=======
>>>>>>> 28883c8e7fcb8fc577cedba0f7adedbc7654f474
    deleteUser
>>>>>>> c8f3f2041ea135324b7a321207bb51b49b999189
}