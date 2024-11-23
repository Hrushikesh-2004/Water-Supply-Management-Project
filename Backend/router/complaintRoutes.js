const express = require('express');
const router = express.Router();

const {getComplaint, postComplaint, getComplaintOfUser, handlecomplaint, searchCanId, ComplaintAssigned} = require('../controller/complaint');

//citizen
router.post("/postcomplaint", postComplaint);//not working
router.post("/usercomplaint", getComplaintOfUser);

//admin
router.get("/getcomplaints", getComplaint);
router.post("/handlecomplaint", handlecomplaint)


//To check whether the user has a canid or not
//for checking if the user has a conneciton to complaint
router.get("/search-canid/:can",searchCanId);

//To update the assinged field when complaint is assigned to a worker
router.put("/AssignedCom/:_id",ComplaintAssigned)

module.exports = router;