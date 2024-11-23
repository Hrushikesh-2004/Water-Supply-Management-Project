const mongoose = require('mongoose')
const{Schema} = mongoose;

const ComplaintSchema = new Schema({
    name: {
        type: String,
        required: false
    },
    canId: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: false
    },
    mobile: {
        type: Number,
        required: false
    },
    subject: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    resolved: {
        type: String,
        default:"no",
        required: false
    },
    assingned: {
        type: Boolean,
        default : false,
        required : false
    }

}, { timestamps: true });

const ComplaintModel = mongoose.model('complaints', ComplaintSchema);

module.exports = ComplaintModel;