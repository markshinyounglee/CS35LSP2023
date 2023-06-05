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
// get user by name
const getUserByName = async (req, res) => {
  try {
    const { usrname } = req.params;
    const user = await User.findOne({ usrname });
    
    if (user) {
      // User found
      res.status(200).json(user);
    } else {
      // User not found
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    // Handle the error appropriately
    console.error('Error fetching user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

const createUser = async (req, res) => {
    const { usrname, pswd, friendlist, blocklist, mybeefs, s_requests, r_requests } = req.body;
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
//I think that this should be a sub feature of accepting and sending requests
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

const patchUserBeefArray = async (req, res) => {
  const { id } = req.params;
  const dummy = await User.findById(id)
  if (!dummy) {
    return res.status(404).json({ error: 'No such user' });
  }

  const already_added = await User.findById(id);
  if (already_added.mybeefs.includes(req.body.mybeefs)) {
    return res.status(400).json({error : "Already added this beef"})
  }
  const user = await User.findOneAndUpdate( 
    {_id : id}, 
    { $push: {mybeefs : req.body.mybeefs} },
    {new : true}
  );
  if (!user) {
    return res.status(400).json({error : 'Unable to add beef at this time'})
  }
  console.log(user)
  res.status(200).json(user);
};

  // const  beefId  = req.body.mybeefs;

  // try {
  //   const user = await User.findByIdAndUpdate(
  //     id,
  //     { $push: { mybeefs: beefId._id } },
  //     { new: true }
  //   );

  //   if (!user) {
  //     return res.status(404).json({ error: 'User not found' });
  //   }

  //   res.json(user);
  // } catch (error) {
  //   res.status(500).json({ error: 'Internal server error' });
  // }

//module.exports = patchUser;


module.exports = {
    getUsers,
    getUser,
    createUser,
    changeUserPswd,
    addUserFriend,
    addUserBlock,
    getUserByName,
    deleteUser,
    patchUserBeefArray
}