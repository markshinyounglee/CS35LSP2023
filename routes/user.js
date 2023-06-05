const express = require('express')
const {
    createUser,
    getUsers, 
    getUser,
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
} = require('../backend/controllers/userController')

const router2 = express.Router()
const mongoose = require('mongoose')


//Get all Users
router2.get('/', getUsers)

//Get a User (based on MongoDB id)
router2.get('/:id', getUser)

<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
//get a user by name: not working currently
router2.get('/:usrname', getUserByName)
=======
>>>>>>> 28883c8e7fcb8fc577cedba0f7adedbc7654f474

router2.get(':/id', getAllBeefsOfUser)


=======
>>>>>>> 16ef78644d74e5d49674a4b34d41916062713fc1
=======
>>>>>>> 16ef78644d74e5d49674a4b34d41916062713fc1

//Create a new User
    //To-do : make it so that two users cannot have the same username
router2.post('/', createUser)

//ChangePswd
router2.patch('/:id/changeUserPswd', changeUserPswd)

//Add a friend
    //To-do : add all of their beefs to visible beefs

//Remove a friend

//Unblock someone
// router2.patch('/:id', removeUserBlock)
//Remove a friend
// router2.patch('/:id', removeUserFriend)
//Make request
router2.patch('/:id/makeUserRequest', makeUserRequest)

router2.patch('/:id/unsendUserRequest', unsendUserRequest)

router2.patch('/:id/acceptUserRequest', acceptUserRequest)

router2.patch('/:id/denyUserRequest', denyUserRequest)


router2.patch('/:id/addUserBlock', addUserBlock)

router2.patch('/:id/removeUserBlock', removeUserBlock)

//THIS FUNCTION IS ONLY USED FOR POSTMAN TESTING PURPOSES (DO NOT DELETE USERS)
router2.delete('/:id', deleteUser)

router2.patch('/:id/addUserBeef', addUserBeef)

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
