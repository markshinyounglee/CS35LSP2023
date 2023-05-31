const mongoose = require('mongoose')

const Schema = mongoose.Schema
const beefSchema = new Schema({
    title: {
        //beef's name
        type: String,
        required: true
    },
    id: {
        //beef's id
        type: Number,
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
    votesForUser2: {
        //beef's votes for user 2
        type: Number,
        required: true
    }
}, {timestamps: true})

module.exports = mongoose.model('Beef', beefSchema)
