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
<<<<<<< HEAD
<<<<<<< HEAD
    if (existing_user) {
=======
    if (existing_user > 0) {
>>>>>>> 16ef78644d74e5d49674a4b34d41916062713fc1
=======
    if (existing_user > 0) {
>>>>>>> 16ef78644d74e5d49674a4b34d41916062713fc1
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

<<<<<<< HEAD
<<<<<<< HEAD
=======
//TO-DO : MAKE IT SO YOU CAN'T CHANGE YOUR PASSWORD TO YOUR EXISTING PASSWORD
>>>>>>> 16ef78644d74e5d49674a4b34d41916062713fc1
=======
//TO-DO : MAKE IT SO YOU CAN'T CHANGE YOUR PASSWORD TO YOUR EXISTING PASSWORD
>>>>>>> 16ef78644d74e5d49674a4b34d41916062713fc1
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

<<<<<<< HEAD
<<<<<<< HEAD
//MAKE IT SO ADDING AN EXISTING FRIEND FAILS
const addUserFriend = async (req, res) => {
=======
//TODO : CAN'T REQUEST SOMEONE IF THEY BLOCKED YOU
const makeUserRequest = async (req, res) => {
>>>>>>> 16ef78644d74e5d49674a4b34d41916062713fc1
=======
//TODO : CAN'T REQUEST SOMEONE IF THEY BLOCKED YOU
const makeUserRequest = async (req, res) => {
>>>>>>> 16ef78644d74e5d49674a4b34d41916062713fc1
  const {id} = req.params
  const user = await User.findById(id)

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such user'})
  }

  console.log('Before:', req.body.s_requests);
  const my_request_id = new mongoose.Types.ObjectId(req.body.s_requests);
  console.log('After:', my_request_id);
  if (id== my_request_id) {
    return res.status(400).json({error : "You cannot make a friend request to yourself"});
  }

  const other_user_exists = await User.findById(new mongoose.Types.ObjectId(req.body.s_requests));
  console.log(other_user_exists);
  if (!other_user_exists) {
    return res.status(404).json({error : 'The user you are trying to request does not exist'});
  }
  if (other_user_exists.blocklist.includes(id)) {
    return res.status(400).json({error : "That user has blocked you, you cannot send them a request."})
  }
  if (user.friendlist.includes(req.body.s_requests)) {
    return res.status(400).json({error: 'You are already friends with that user!'})
  }
  if (user.s_requests.includes(req.body.s_requests) ) {
    return res.status(400).json({error: 'This request has already been sent.'});
  }

  const request = await User.findOneAndUpdate({_id: id}, {
    $push : {s_requests : req.body.s_requests}},
    {new : true}
  );
  if (!request) {
    return res.status(404).json({error : 'This request cannot be made right now'})
  }
  const other_user = await User.findOneAndUpdate( {_id: req.body.s_requests}, {
    $push : {r_requests: id}},
    {new : true}
  );
  if (!other_user) {
    return res.status(400).json({error : "Unable to make request at this time."})
  }
  res.status(200).json(request)
}

const unsendUserRequest = async (req, res) => {
  const {id} = req.params
  const user = await User.findById(id)

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such user'})
  }

  const other_user_exists = await User.findById(new mongoose.Types.ObjectId(req.body.s_requests));
  if (!other_user_exists) {
    return res.status(404).json({error : 'The user you are trying to request does not exist'});
  }
  if (!user.s_requests.includes(req.body.s_requests) ) {
    return res.status(400).json({error: "This request hasn't been sent."});
  }

<<<<<<< HEAD
<<<<<<< HEAD
=======
=======
>>>>>>> 16ef78644d74e5d49674a4b34d41916062713fc1
  const request = await User.findOneAndUpdate({_id: id}, {
    $pull : {s_requests : req.body.s_requests}},
    {new : true}
  );

  if (!request) {
    return res.status(404).json({error : 'This request cannot be made right now'})
  }
  const other_user = await User.findOneAndUpdate( {_id: req.body.s_requests}, {
    $pull : {r_requests: id}},
    {new : true}
  );
  if (!other_user) {
    return res.status(400).json({error : "Unable to make request at this time."})
  }
  res.status(200).json(request)

  
}
const acceptUserRequest = async (req, res) => {
  const {id} = req.params
  const user = await User.findById(id)

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such user'})
  }
  const other_user_exists = await User.findById(new mongoose.Types.ObjectId(req.body.r_requests));
  if (!other_user_exists) {
    return res.status(404).json({error: 'The user you are trying to accept a request from does not exist'});
  }
  if (other_user_exists.blocklist.includes(id)) {
    return res.status(400).json({error : "That user has blocked you, you cannot send them a request."})
  }
  if (!user.r_requests.includes(req.body.r_requests)) {
    return res.status(400).json({error : 'That user did not request you.'})
  }
  const request = await User.findOneAndUpdate({_id: id}, {
    $pull : {r_requests : req.body.r_requests},
    $push : {friendlist : req.body.r_requests}},
    {new : true}
  );
  if (!request) {
    return res.status(400).json({error : 'Could not make this request'})
  }
  const other_user = await User.findOneAndUpdate( {_id: req.body.r_requests}, {
    $pull : {s_requests: id},
    $push : {friendlist : id}},
    {new : true}
  );
  if (!other_user) {
    return res.status(400).json({error : "Unable to accept this request at this time"})
  }
  res.status(200).json(request)
  }

  const denyUserRequest = async (req, res) => {
    const {id} = req.params
    const user = await User.findById(id)
  
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({error: 'No such user'})
    }
    const other_user_exists = await User.findById(new mongoose.Types.ObjectId(req.body.r_requests));
    if (!other_user_exists) {
      return res.status(404).json({error: 'The user you are trying to accept a request from does not exist'});
    }
    if (other_user_exists.blocklist.includes(id)) {
      return res.status(400).json({error : "That user has blocked you, you cannot send them a request."})
    }
    if (!user.r_requests.includes(req.body.r_requests)) {
      return res.status(400).json({error : 'That user did not request you.'})
    }
    const request = await User.findOneAndUpdate({_id: id}, {
      $pull : {r_requests : req.body.r_requests}},
      {new : true}
    );
    if (!request) {
      return res.status(400).json({error : 'Could not make this request'})
    }
    const other_user = await User.findOneAndUpdate( {_id: req.body.r_requests}, {
      $pull : {s_requests: id}},
      {new : true}
    );
    if (!other_user) {
      return res.status(400).json({error : "Unable to accept this request at this time"})
    }
    res.status(200).json(request)
    }

<<<<<<< HEAD
>>>>>>> 16ef78644d74e5d49674a4b34d41916062713fc1
=======
>>>>>>> 16ef78644d74e5d49674a4b34d41916062713fc1
//MAKE IT SO BLOCKING AN EXISTING BLOCK FAILS
const addUserBlock = async (req, res) => {
  const {id} = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such user'})
  }
  const already_blocked = await User.findById(id)
  if (already_blocked.blocklist.includes(req.body.blocklist)) {
    return res.status(400).json({error : 'Already blocked that user'})
  }
  block_id = new mongoose.Types.ObjectId(req.body.blocklist)
  if (id== block_id) {
    return res.status(400).json({error : "You can't block yourself!"});
  }

  const user = await User.findOneAndUpdate(
    { _id: id },
    {
      $push: { blocklist: req.body.blocklist },
    },
    { new: true }
  );
  console.log(user)
  const user_pull = await User.findOneAndUpdate(
    {_id: id}, 
    {$pull: {
      friendlist: req.body.blocklist,
      s_requests: req.body.blocklist,
      r_requests: req.body.blocklist,
    } },
    {new: true}
  );
  console.log(user_pull)
  const other_user = await User.findOneAndUpdate(
    { _id: block_id },
    {
      $pull: {
        friendlist: id,
        s_requests: id,
        r_requests: id,
      },
    },
    { new: true }
  );
  
  if (!user || !other_user) {
    return res.status(404).json({ error: 'Failed to make block' });
  }

  res.status(200).json(user_pull);
}

const removeUserBlock = async (req, res) => {
  const {id} = req.params
  const block_check = await User.findById(id)
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such user'})
  }
  if (!block_check.blocklist.includes(req.body.blocklist) ) {
    return res.status(400).json({error : 'Cannot unblock that user, they were never blocked in the first place'})
  }
  const user = await User.findOneAndUpdate({_id: id}, {
    $pull: {blocklist : req.body.blocklist} },
    {new : true}
  );
  if (!user) {
    return res.status(400).json({error: 'Failed to unblock'})
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


const addUserBeef = async (req, res) => {
  const { id } = req.params;
  const dummy = await User.findById(id)
  if (!dummy) {
    return res.status(404).json({ error: 'No such user' });
  }


  const already_added = await User.findById(id);
  if (already_added.mybeefs.includes(req.body.mybeefs)) {
    return res.status(400).json({error : "Already added this beef"})
  }
  const user = await User.findOneAndUpdate( {_id : id}, {
    $push: {mybeefs : req.body.mybeefs}},
    {new : true}
  );
  if (!user) {
    return res.status(400).json({error : 'Unable to add beef at this time'})
  }
  console.log(user)
  res.status(200).json(user);
};



module.exports = {
    getUsers,
    getUser,
    createUser,
    changeUserPswd,
    makeUserRequest,
    unsendUserRequest,
    acceptUserRequest,
    denyUserRequest,
    addUserBlock,
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
    getUserByName,
<<<<<<< HEAD
    getAllBeefsOfUser
=======
=======
>>>>>>> 28883c8e7fcb8fc577cedba0f7adedbc7654f474
    deleteUser
>>>>>>> c8f3f2041ea135324b7a321207bb51b49b999189
=======
    removeUserBlock,
    deleteUser,
    addUserBeef
>>>>>>> 16ef78644d74e5d49674a4b34d41916062713fc1
=======
    removeUserBlock,
    deleteUser,
    addUserBeef
>>>>>>> 16ef78644d74e5d49674a4b34d41916062713fc1
}