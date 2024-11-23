const express = require('express');
const router = express.Router();

const {WaterDistributionData, getComplaintHistory} = require('../controller/reportsapi.js')

router.get('/getWaterDistributionData', WaterDistributionData);
router.get('/getComHistory', getComplaintHistory);

module.exports = router;