const express = require('express');
const router = express.Router();

const {addConnection, searchConnection, receivedConnections, acceptConneciton, AcceptedConnectionsList,getUserCity} = require('../controller/connections')

// url is forwarded by connection/

// citizen
router.post("/addconnection", addConnection);
router.get("/searchuserconnection/:name", searchConnection)//not working

//admin
router.get("/receivedconnections", receivedConnections)
router.delete("/acceptconnection/:id", acceptConneciton)
router.get("/acceptedconnectionslist", AcceptedConnectionsList)

//send users city
router.get("/getUserCity/:canId",getUserCity);

module.exports = router;