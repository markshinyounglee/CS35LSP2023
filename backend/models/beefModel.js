const mongoose = require('mongoose')
//initialize votesForUser1 and votesForUser2 to 0 and don't make them required
const Schema = mongoose.Schema
const beefSchema = new Schema({
<<<<<<< HEAD
<<<<<<< HEAD
    title: {
        //beef's name
        type: String,
        required: true
    },
    description: {
        //beef's description
        type: String,
        required: true
    },
    votesForUser1: {
        //beef's votes for user 1
        type: Number,
        required: true
    },
    user1: {
        type: String,
        required: true
    },
    user2: {
        type: String,
        required: true
    },
    votesForUser2: {
        //beef's votes for user 2
        type: Number,
        required: true
    }
=======
=======
>>>>>>> 16ef78644d74e5d49674a4b34d41916062713fc1
   title: {
       //beef's name
       type: String,
       required: true
   },
   description: {
       //beef's description
       type: String,
       required: true
   },
   votesForUser1: {
       //beef's votes for user 1
       type: Number,
       required: false
   },
   user1: {
       type: String,
       required: true
   },
   user2: {
       type: String,
       required: true
   },
   votesForUser2: {
       //beef's votes for user 2
       type: Number,
       required: false
   },
   usersThatVotedForUser1: {
       //Taejus should insert the user id when they vote for user 1 on a beef object
       type: Array,
       items: {
           type: String
       }
   },
   usersThatVotedForUser2: {
       //Taejus should insert the user id when they vote for user 2 on a beef object
       type: Array,
       items: {
           type: String
       }
   }
<<<<<<< HEAD
>>>>>>> 16ef78644d74e5d49674a4b34d41916062713fc1
=======
>>>>>>> 16ef78644d74e5d49674a4b34d41916062713fc1
}, {timestamps: true})


module.exports = mongoose.model('Beef', beefSchema)
