const mongoose = require('mongoose')
//initialize votesForUser1 and votesForUser2 to 0 and don't make them required
const Schema = mongoose.Schema
const beefSchema = new Schema({
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
}, {timestamps: true})

module.exports = mongoose.model('Beef', beefSchema)
