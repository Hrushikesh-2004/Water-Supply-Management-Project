const ConnectionModel = require('../model/connections');
// const { connections } = require('mongoose');
const acceptedConnectionsModel = require('../model/AcceptedConnections');



//admin
const generateCanId = async () => {
  const min = 10000000;
  const max = 99999999;

  let isUnique = false;
  let randomNumber;

  while (!isUnique) {
    randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;

    // Check if the number is unique in the database
    const existingConnection = await ConnectionModel.findOne({ can: randomNumber });

    isUnique = !existingConnection;
  }

  return randomNumber;
};


//Admin

//fetching all received connections
const receivedConnections  = async(req,res) =>{

  try{
    console.log("Trying to fetch connections")
    const Received = await ConnectionModel.find({}) ;
    res.status(200).json(Received);
  }
  catch(error){
    console.log("Error while fetching received connections")
    res.status(400).json({error: json.error})
  }

}

//admin accepting connection
const acceptConneciton = async (req, res) => {
  const { id } = req.params;

  try {
    const accepted = await ConnectionModel.findOneAndDelete({ _id: id });

    if (!accepted) {
      return res.status(400).json({ error: "No such connection request received" });
    }

    const { name, address, city, pincode, can } = accepted;

    try {
      const response = await acceptedConnectionsModel.create({
        name,
        address,
        city,
        pincode,
        can
      });

      console.log("Connection accepted");
      res.status(200).json(response);
    } catch (error) {
      console.log("Error while transferring connection to accepted database");
      res.status(400).json({ error: error.message });
    }
  } catch (error) {
    console.log("Error while trying to delete in the backend");
    res.status(400).json({ error: error.message });
  }
};







//citizen
//request for a connection
const addConnection = async (req, res) => {
  const { name, address, city, pincode } = req.body;
  const can = await generateCanId();

  try {
    
    console.log("Trying to add connection in backend");
    const connection = await ConnectionModel.create({
      name,
      address,
      city,
      pincode,
      can // Use await here
    });

    console.log("Connection added successfully in the backend");

    return res.status(200).json({
      success: true,
      message: connection,
    });
  } catch (error) {
    console.error('Error while adding connection:', error);

    res.status(400).json({
      success: false,
      message: `Connection not saved: ${error.message}`,
    });
  }
};


//fetching citzens accepted connections
const searchConnection = async (req, res) => {
    const { name } = req.params;

    try {
        
        const result = await acceptedConnectionsModel.findOne({name: name});

        if (result.length === 0) {
            return res.status(201).json({
            success: false,
            message: "No connections found for user",
            data:result,
            });
        } 
            // Handle the case where 'result' is found
          res.status(200).json({
            success: true,
            message: "Connections found for user",
            data: result,
            });
        
        } catch (error) {
        // console.error('Error finding connections:', error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
  }



const AcceptedConnectionsList = async(req,res) => {
  try {
    const result = await acceptedConnectionsModel.find({});

    res.status(200).json({
      success:true,
      data: result
    })
  } catch (error) {
    res.status(500).json({
      success:false,
      message: `Server Error: ${error}`
    })
  }
}

//send users city
const getUserCity = async (req, res) => {
  const { canId } = req.params;
  console.log(canId);
  try {
      const result = await acceptedConnectionsModel.findOne({ can: canId });

      if (!result) {
        return res.status(404).json({
          success: false,
          message: "User not found"
        });
      }
      
      res.status(200).json({
          success: true,
          data: result
      });
  } catch (error) {
      res.status(500).json({
          success: false,
          message: "Error while sending the user's city"
      });
  }
};


module.exports = { addConnection, searchConnection, receivedConnections, acceptConneciton, AcceptedConnectionsList, getUserCity};