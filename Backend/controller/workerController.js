const WorkerModel = require('../model/WorkersModel')
const nodemailer = require('nodemailer');

// const transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: 'mightguy7.2000@gmail.com',
//     pass: 'mhdw wbta bowx tmnn',
//   }
// });

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'mightguy7.2000@gmail.com',
    pass: 'mhdw wbta bowx tmnn', // Replace this with a secure method, e.g., using environment variables
  },
});


const AssignComplaint = async (req, res) => {
  const { city } = req.params;
  try {
    // Find the first worker in the given city where Work_Assigned is false
    const foundWorker = await WorkerModel.findOne({ city: city, Work_Assigned: false });

    if (foundWorker) {
      // Update the Work_Assigned field to true
      const updatedWorker = await WorkerModel.findOneAndUpdate(
        { _id: foundWorker._id }, // Use the _id of the found worker
        { $set: req.body }, // Update the Work_Assigned field
        { new: true } // Return the updated document
      );

      res.status(200).json(updatedWorker);
    } else {
      res.status(404).json({ message: 'No available worker found in the specified city' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error while finding/updating a worker' });
  }
};


const AddWorker = async (req, res) => {
    try {
        const { name, phoneNumber, city, email, Worker_id, password } = req.body;
    
        // Use the create method to create and save a new worker document
        const newWorker = await WorkerModel.create({
          name,
          phoneNumber,
          city,
          email,
          Worker_id,
          password
        });
    
        res.status(201).json({ message: 'Worker created successfully', worker: newWorker });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
      }
    };


// const SendDetails = async(req,res)=>{
//   const {UserEmail, WorkerEmail,WorkerName, WorkerMobile } = req.body;

//   console.log("Tryig to send Email");

//   const mailOptions = {
//     from: 'mightguy7.2000@gmail.com',
//     to: UserEmail,
//     subject: 'Worker Details',
//     text: `Hey Your work has been assinged to ${WorkerName}
//     here is there's contact details, Mobile Number:${WorkerMobile} and Mail: ${WorkerEmail}`,
//   };

//   try {
//     const info = await transporter.sendMail(mailOptions);
//     console.log('Email sent:', info.response);
//     res.status(200).json({ message: `Worker Details sent successfully`});
//   } catch (error) {
//     console.error('Error sending email:', error.message);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// };

const SendDetails = async (req, res) => {
  const { UserEmail, WorkerEmail, WorkerMobile, WorkerName } = req.body;

  console.log("Trying to send Email");
  console.log( UserEmail, WorkerEmail, WorkerName, WorkerMobile);

  const mailOptions = {
    from: 'mightguy7.2000@gmail.com',
    to: UserEmail,
    subject: 'Worker Details',
    text: `Hey User, your work has been assigned to ${WorkerName}.
    Here are their contact details - Mobile Number: ${WorkerMobile} and Mail: ${WorkerEmail}`,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.response);
    res.status(200).json({ message: 'Worker Details sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {AssignComplaint, AddWorker, SendDetails};
