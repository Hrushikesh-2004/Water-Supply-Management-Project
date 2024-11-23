const pointModel = require('../model/pointsSchema')
// const name=require("")

const updatePoint = async (req, res) => {
    const { coordinates} = req.body;
    console.log(coordinates);

    try {
        if (!Array.isArray(coordinates) || coordinates.length !== 2) {
            return res.status(400).json({
                success: false,
                message: "Invalid coordinates! Please provide valid coordinates."
            });
        }

        // Assuming you have a unique identifier for the point, let's call it 'pointId'
        // const pointId = req.params.pointId;

        // Assuming 'pointModel' is your Mongoose model
        const updatedPoint = await pointModel.findOneAndUpdate(
            { coordinates: [78.488879, 17.398452]},  // Replace '_id' with the actual identifier field of your point
            { "properties.supplied": "no"},
            {new:true}  // Set to true to return the updated document
        );

        if (!updatedPoint) {
            return res.status(404).json({
                success: false,
                message: "Point not found."
            });
        }

        return res.status(200).json({
            success: true,
            message: "Point updated successfully.",
            data: updatedPoint
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: `Error occurred: ${error}`
        });
    }
};
module.exports=updatePoint;