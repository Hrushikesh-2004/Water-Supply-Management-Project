const express = require('express')
const {addPoint, getData, addLine,getlinedata, addJunction, getJunctionData, getJunctionDataByID, getDataByCanID} = require('../controller/addPointCor.js')
const updatedata = require('../controller/updatedata.js')
const router = express.Router();

router.post('/addpoint', addPoint);
router.get('/getdata', getData);
router.get('/getjunctiondata', getJunctionData);
router.post('/getjunctiondatabyid', getJunctionDataByID);
router.post('/addjunction', addJunction);
router.post('/addline', addLine);
router.get('/getlinedata',getlinedata);
router.post('/updatepoint', updatedata);
router.post('/getdetailsbycanid', getDataByCanID);

module.exports = router;