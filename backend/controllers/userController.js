const User = require('../models/userModel.js')
const mongoose = require('mongoose')

// Events
const { EventEmitter } = require('events')
const eventEmitter = new EventEmitter()

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
  const {name} = req.params
  console.log(name)
  const user = await User.findOne({usrname : name})
  if (!user) {
    return res.status(404).json({error: 'No such user'})
  }
  res.status(200).json(user)

}

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

  eventEmitter.emit('userUpdated', { userId: user_pull.id.toString() })
  res.status(200).json(user_pull)
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
  eventEmitter.emit('userUpdated', { userId: user.id.toString() })
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
  
  eventEmitter.emit('userUpdated', { userId: dummy.id.toString() })
  res.status(200).json(user);
};

const makeUserRequest = async (req, res) => {
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
  //emit friend request event, should send id of user sending the
  //request 
  eventEmitter.emit('friendRequest', {friendUserId: other_user._id, currentUserId: request.usrname })
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
  if (!mongoose.Types.ObjectId.isValid(new mongoose.Types.ObjectId(req.body.r_requests))) {
    return res.status(404).json({error : 'Request not found'})
  }
  const other_user_exists = await User.findById(req.body.r_requests);
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
    $pull : {r_requests : req.body.r_requests, s_requests : req.body.r_requests},
    $push : {friendlist : req.body.r_requests}},
    {new : true}
  );
  if (!request) {
    return res.status(400).json({error : 'Could not make this request'})
  }
  const other_user = await User.findOneAndUpdate( {_id: req.body.r_requests}, {
    $pull : {s_requests: id, r_requests : id},
    $push : {friendlist : id}},
    {new : true}
  );
  if (!other_user) {
    return res.status(400).json({error : "Unable to accept this request at this time"})
  }
  res.status(200).json(request)
  }

module.exports = {
    getUsers,
    getUser,
    createUser,
    changeUserPswd,
    addUserFriend,
    addUserBlock,
    removeUserBlock,
    getUserByName,
    deleteUser,
    patchUserBeefArray,
    makeUserRequest,
    unsendUserRequest,
    acceptUserRequest,
    eventEmitter
}