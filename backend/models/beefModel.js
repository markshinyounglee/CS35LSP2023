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
    }
}, {timestamps: true})

module.exports = mongoose.model('Beef', beefSchema)
