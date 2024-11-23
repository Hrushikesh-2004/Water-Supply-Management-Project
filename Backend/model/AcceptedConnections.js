const mongoose = require('mongoose')
const Schema = mongoose.Schema

const acceptedConnectionsSchema = new Schema({
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
    },
    __v:{
        type: Number,
        default:0,
    }

}, {timestamps:true});
const acceptedConnectionsModel = mongoose.model('AcceptedConnections', acceptedConnectionsSchema);
module.exports = acceptedConnectionsModel;