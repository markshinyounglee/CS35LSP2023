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
        }
    },
    blocklist : {
        type : Array,
        items : {
            type : String
        }
    },
    //mybeefs refers to the beefs that this particular user owns
    mybeefs : {
        type : Array, 
        items : {
            type : String
        }
    },
    requests : {
        type: Array,
        items : {
            type : String
        }
    }
}, {timestamps: true})

module.exports = mongoose.model('User', userSchema)