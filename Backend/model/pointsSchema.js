const mongoose = require('mongoose')
const{Schema} = mongoose;

const pointSchema = new Schema({
    type: {
        type: String,
        enum: ['Point'],
        default: 'Point',
        required: true
    },
    coordinates: {
        type: [Number],
        required: true
    },
    properties: {
        can_id: String,
        major_Junction: String,
        description: String,
        supplied: String
    }
});


const junctionSchema = new Schema({
    type: {
        type: String,
        enum: ['Point'],
        default: 'Point',
        required: true
    },
    coordinates: {
        type: [Number],
        required: true
    },
    properties: {
        unique_id:String,
        supplied: String,
    }
});



const pointModel = mongoose.model('points', pointSchema);
const junctionModel = mongoose.model('junctions', junctionSchema);
module.exports = {pointModel, junctionModel};