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
    s_requests : {
        type: Array,
        items : {
            type : String
        }
    },
    r_requests : {
        type: Array,
        items : {
            type : String
        }
    },
    myvotes : {
        //holds array of beef object ids that this user has already voted on
        //Taejus should insert the beef's id into the user that voted on the beef
        type: Array,
        items: {
            type:String
        }
    }
    //myvotes

    //map mymessages (key = user I'm chatting with id), (payload = (dict (key = timestamp), (payload = message)))
}, {timestamps: true})

//TO-DO : MAYBE ADD A NOTIFICATIONS ARRAY OF NOTIFICATIONS A USER CAN RECEIVE FOR UPDATES LIKE WHEN A FRIEND IS MADE, A BEEF IS STARTED WITH YOU, ETC...

module.exports = mongoose.model('User', userSchema)