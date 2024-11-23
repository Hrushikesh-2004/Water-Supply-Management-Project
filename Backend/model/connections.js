const mongoose = require('mongoose');
const {Schema} = mongoose;

const connectionSchema = new Schema({
    name:{
        type: String,
        required: true,
    },
    address:{
        type: String,
        required: true,
    },
    city:{
        type: String,
        required: true,
    },
    pincode:{
        type: Number,
        required: true,
    },
    can:{
        type: Number,
        required: false,
        default: -1
    }
}, {timestamps:true});

const ConnectionModel = mongoose.model('connections', connectionSchema);
module.exports = ConnectionModel;
