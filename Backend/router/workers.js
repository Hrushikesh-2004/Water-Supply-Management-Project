const express = require('express');
const router = express.Router();
const {AssignComplaint, AddWorker, SendDetails} = require('../controller/workerController');


router.put('/assigncomplaint/:city',AssignComplaint);

router.post('/addworker',AddWorker);

router.post("/sendworkerdetails",SendDetails);


module.exports = router;