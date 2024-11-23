const mongoose = require('mongoose')
const{Schema} = mongoose;

const userSchema = new Schema({
    username:{type:String,
        required:true,
        unique:true
    },
    phone:{
        type:Number,
        required:true,
        unique:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{type:String,
        required:true,
        unique:true,
    },
    role:{type:String,
        default: 'citizen',
        required:true
    },
});

const userModel = mongoose.model('users', userSchema);
module.exports = userModel;