const {pointModel, junctionModel} = require('../model/pointsSchema');
const ComplaintModel = require('../model/complaintSchema');

const WaterDistributionData = async (req, res) => {
    try {
      const points = await pointModel.find();
      console.log(points);
  
      // Create a mapping of Main Junctions to Can ID counts
      const junctionCounts = {};
      const houseids = {};
  
      points.forEach(point => {
        const mainJunction = point.properties.major_Junction;
        const canId = point.properties.can_id;
  
        // Increment the count for the mainJunction
        junctionCounts[mainJunction] = (junctionCounts[mainJunction] || 0) + 1;
  
        // Add the can_id to the list under the mainJunction
        houseids[mainJunction] = houseids[mainJunction] || [];
        houseids[mainJunction].push(canId);
      });
  
      res.status(200).json({
        junctionCounts: junctionCounts,
        houseids: houseids,
      });
    } catch (error) {
      console.error('Error fetching points:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
};

const getComplaintHistory = async (req, res) => {
  try {
      const complaints = await ComplaintModel.find({resolved:"yes"}).sort({ createdAt: -1 });
      res.status(200).json(complaints);
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
}

module.exports = {WaterDistributionData, getComplaintHistory}