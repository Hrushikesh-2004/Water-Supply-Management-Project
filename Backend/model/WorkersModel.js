// const complaintSchema = new mongoose.Schema({
//     name: {
//       type: String,
//       required: true,
//     },
//     canId: {
//       type: String,
//       required: true,
//     },
//     email: {
//       type: String,
//       required: true,
//     },
//     mobile: {
//       type: Number,
//       required: true,
//     },
//     subject: {
//       type: String,
//       required: true,
//     },
//     description: {
//       type: String,
//       required: true,
//     },
//     resolved: {
//       type: String, // Assuming "resolved" is a string ('yes' or 'no'), change type accordingly
//       required: true,
//     },
//     createdAt: {
//       type: Date,
//       default: Date.now,
//     },
//     updatedAt: {
//       type: Date,
//       default: Date.now,
//     },
//   })

const mongoose = require('mongoose');
const Schema = mongoose.Schema
const workerSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: String,
    required: true
  },
  city:{
    type:String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  Worker_id: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  Work_Assigned: {
      type: Boolean,
      required: false,
      default: false
  },
  Assigned_House: {
    type: Object,
    required: false,
    default:{}
  }
});
const WorkerModel = mongoose.model('workers', workerSchema);
module.exports = WorkerModel;