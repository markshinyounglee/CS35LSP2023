const mongoose = require('mongoose')

const Schema = mongoose.Schema
const userSchema = new Schema( {
    usrname: {
        type: String,
        required : true
    },
    pswd : {
        type : String, 
        required : true
    },
    friendlist : {
        type : Array,
        items : {
            type : String
        },
    },
    blocklist : {
        type : Array,
        items : {
            type : String
        }
    },
    mybeefs : {
        type : Array, 
        items : {
            beef : {
                title : {
                    type : String,
                    required : true
                },
                description: {
                    type : String,
                    required : true
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
            }
        }
    },

}, {timestamps: true})

module.exports = mongoose.model('User', userSchema)