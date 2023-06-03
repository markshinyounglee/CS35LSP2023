const express = require('express')
const {
    createUser,
    getUsers, 
    getUser,
    changeUserPswd,
    addUserFriend,
    addUserBlock
} = require('../backend/controllers/userController')

const router2 = express.Router()
const mongoose = require('mongoose')

//Get all Users
router2.get('/', getUsers)

//Get a User (based on MongoDB id)
router2.get('/:id', getUser)


//Create a new User
    //To-do : make it so that two users cannot have the same username
router2.post('/', createUser)

//ChangePswd
router2.patch('/:id/changeUserPswd', changeUserPswd)

//Add a friend
    //To-do : add all of their beefs to visible beefs
router2.patch('/:id/addUserFriend', addUserFriend)

router2.patch('/:id/addUserBlock', addUserBlock)

//Remove a friend

//Unblock someone
// router2.patch('/:id', removeUserBlock)
//Remove a friend
// router2.patch('/:id', removeUserFriend)
//Make request
// router2.patch('/:id/usrname', makeUserRequest)
//Accept request
    //Add the r_request to your friendlist, add s_request to your friend's friendlist
    //Your beefs and their beefs get updated --> notification
// router2.patch('/:id/request', acceptUserRequest) 
//Deny request
    //Denying a request deletes it from your received requests, deletes it from friend's sent requests
// router2.patch('/:id/request', remove)

//Add a beef
    //we need a beef instance like Abhi had a user instance so when user 
// router2.patch('/:id', addUserBeef)
//Remove a beef
// router2.patch('/:id', addUserBeef)

module.exports = router2