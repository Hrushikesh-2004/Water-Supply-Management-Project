const {pointModel, junctionModel} = require('../model/pointsSchema');
const lineModel = require('../model/lineSchema');

const addPoint = async (req, res) => {
    const {type, coordinates, properties} = req.body;
    console.log(type, coordinates, properties);

    try {
        if(!type || !Array.isArray(coordinates) || coordinates.length !== 2){
            return res.status(400).json({
                success: false,
                messaage: "Point coordinates not saved! Please try again"
            })
        }

        const pointInfo = pointModel(req.body);
        const result = await pointInfo.save();

        return res.status(200).json({
            success: true,
            message: `Point data added sucessfully: ${result}`
        });
    } catch (error) {
        return res.status(400).json({
            success:false,
            message: `Error occured: ${error}`
        });
    }
}


const addJunction = async (req, res) => {

    // async function ranNum() {
    //     var isPresent = true;
      
    //     while (isPresent) {
    //     //   var randomNumber = Math.floor(Math.random() * 10);
    //       var str = "";
      
    //       while (str.length < 6) {
    //         str = str + Math.floor(Math.random() * 10);
    //       }
    //       str = Number(str);
    //       // Assuming ConnectionModel is a Mongoose model, use findOne on its prototype
    //       const queryObject = {
    //         'properties.id': str
    //       };
    //       isPresent = await junctionModel.find({queryObject});
      
    //       if (!isPresent) {
    //         isPresent = false;
    //         return str;
    //       }
    //     }
    //   }

    const {type, coordinates, properties} = req.body;
    // console.log(type, coordinates, properties);

    try {
        if(!type || !Array.isArray(coordinates) || coordinates.length !== 2){
            return res.status(400).json({
                success: false,
                messaage: "Junction coordinates not saved! Please try again"
            })
        }

        const pointInfo = junctionModel({
            type: type,
            coordinates: coordinates,
            properties:{
                name:properties.name,
                description: properties.description,
                supplied: properties.supplied,
                unique_id: properties.unique_id,
            }
        });
        const result = await pointInfo.save();

        return res.status(200).json({
            success: true,
            message: `Junction data added sucessfully: ${result}`
        });
    } catch (error) {
        return res.status(400).json({
            success:false,
            message: `Error occured: ${error}`
        });
    }
}


const getJunctionData = async (req, res) => {
    try {
        const junctionData = await junctionModel.find({});
        console.log(junctionData);
        res.status(200).json({
            junctionData
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Failed to get points data."
        })
    }
};

const getJunctionDataByID = async (req, res) => {
    try {
        const uniqueid = req.body.unique_id;
        const junctionData = await junctionModel.find({
            'properties.unique_id':uniqueid,
        });
        console.log(junctionData);
        res.status(200).json({
            junctionData
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Failed to get points data."
        })
    }
};

const addLine = async (req, res) => {
    const {type, coordinates, properties} = req.body;

    try {
        if (!type || !coordinates){
            return res.status(400).json({
                success: false,
                message: `Line Data not saved! Please try again`
            })
        }
        const lineData = lineModel(req.body);
        const result = await lineData.save();

        return res.status(200).json({
            success: true,
            messaage: `Line data saved sucessfully: ${result}`
        })
    } catch (error) {
        res.status(200).json({
            success: false,
            messaage: `Error occurred: ${error}`
        })
    }

};
const getlinedata=async(req,res)=>{
    try{
        const linedata=await lineModel.find({});
        console.log(linedata);
        res.status(200).json({linedata});
    }catch(error){
        res.status(400).json({
            success:false,
            message:"Failed to get lines data"
        })
    }
}


const getData = async (req, res) => {
    try {
        const pointsData = await pointModel.find({});
        console.log(pointsData);
        res.status(200).json({
            pointsData
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Failed to get points data."
        })
    }
};


const getDataByCanID = async(req,res)=>{
    try {
        const {canid} = req.body;
        console.log(canid);

        const pointData = await pointModel.find({
            "properties.can_id":canid
        })

        if(!pointData){
            res.status(400).json({
                success: false,
                messaage:'Can ID not found'
            })
        }
        res.status(200).json({
            pointData
        })
    } catch (error) {
        res.status(400).json({
            error
        })
    }
}

module.exports = {addPoint, getData, addLine, getlinedata, addJunction, getJunctionData, getJunctionDataByID, getDataByCanID};