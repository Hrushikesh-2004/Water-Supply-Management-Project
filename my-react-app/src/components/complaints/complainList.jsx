import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {jwtDecode} from "jwt-decode";
import { useCookies } from "react-cookie";
import { IoIosAlert } from "react-icons/io";
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ComplaintList = () => {
    const [complaints, setComplaints] = useState([]);
    const [cookies, setCookies] = useCookies(["access_token"]);
    const user = cookies.access_token ? jwtDecode(cookies.access_token) : null;
    const navigate = useNavigate();
    const userId = user.userId;

    useEffect(() => {
        // if (!userId) {
        //     navigate('/auth', { replace: true });
        //     return;
        // }

        const fetchComplaints = async () => {
            try {
                if (user && (user.role === "admin" || user.role === "engineer")) {
                    const response = await axios.get('http://localhost:5001/complaints/getcomplaints', {
                        headers: {
                            Authorization: `Bearer ${cookies.access_token}`,
                        },
                    });
                    const allComplaints = response.data;
                    const unresolvedComplaints = allComplaints.filter(
                        (complaint) => complaint.resolved === 'no'
                    );
                    setComplaints(unresolvedComplaints);
                } else if (user && user.role === "citizen") {
                    const response = await axios.post('http://localhost:5001/complaints/usercomplaint', {
                        "name": user.name
                    }, {
                        headers: {
                            Authorization: `Bearer ${cookies.access_token}`,
                        },
                    });
                    setComplaints(response.data);
                }
            } catch (error) {
                console.error('Error fetching complaints:', error);
                toast.error('Failed to fetch complaints. Please try again.', {
                    position: 'top-center',
                });
            }
        };
        fetchComplaints();
    }, [user, userId, cookies.access_token, navigate]);

    const handleYesClick = async (complaintId) => {
        try {
            const res = await axios.post('http://localhost:5001/complaints/handlecomplaint', {
                _id: complaintId.toString(),
            }, {
                headers: {
                    Authorization: `Bearer ${cookies.access_token}`,
                },
            });
            if (res.status === 200) {
                const updatedComplaints = complaints.filter(
                    (complaint) => complaint._id.toString() !== complaintId.toString()
                );
                setComplaints(updatedComplaints);
                toast.success('Complaint resolved successfully!', {
                    position: 'top-center',
                });
            } else {
                console.log("No action taken");
                toast.info('No action taken.', {
                    position: 'top-center',
                });
            }
        } catch (error) {
            console.error(`Error updating complaint status:`, error);
            toast.error('Failed to update complaint status.', {
                position: 'top-center',
            });
        }
    };

    const handleNoClick = (complaintId) => {
        console.log(`No action taken for complaint ID ${complaintId}`);
        // Optionally, implement any specific logic for "No" action
    };

    const handleAssignComplaint = async (complaint) => {
        console.log("Complaint Details: ", complaint);
      
        try {
          // Step 1: Get user's city and address
          const response = await axios.get(
            `http://localhost:5001/connection/getUserCity/${complaint.canId}`
          );
          console.log("Response from getUserCity:", response);
      
          if (!response.data || !response.data.data) {
            throw new Error("Invalid API response structure");
          }
          const { city, address: Useraddress } = response.data.data;
      
          if (!city) {
            throw new Error("City is missing in the API response");
          }
      
          // Step 2: Find a worker and assign the complaint
          const Worker = await axios.put(
            `http://localhost:5001/workers/assigncomplaint/${city}`,
            {
              Work_Assigned: true,
              Assigned_House: {
                can: complaint.can,
                address: Useraddress,
                subject: complaint.subject,
                description: complaint.description,
                email: complaint.email,
                mobile: complaint.mobile,
              },
            }
          );
      
          const Details = {
            UserEmail: complaint.email,
            WorkerEmail: Worker.data.email,
            WorkerMobile: Worker.data.phoneNumber,
            WorkerName: Worker.data.name,
          };
      
          // Step 3: Update the complaint's "assigned" status
          await axios.put(
            `http://localhost:5001/complaint/AssignedCom/${complaint._id}`
          );
          toast.success("Complaint assigned successfully!", {
            position: "top-center",
          });
      
          // Step 4: Notify the user with worker details
          try {
            await axios.post(
              "http://localhost:5001/workers/sendworkerdetails",
              Details
            );
            toast.info("Worker details sent to the user.", {
              position: "top-center",
            });
          } catch (error) {
            console.error("Error while sending worker details to the user", error);
            toast.error("Failed to notify the user about the worker.", {
              position: "top-center",
            });
          }
        } catch (error) {
          console.error("Error during complaint assignment process", error);
      
          if (error.response) {
            // Handle specific HTTP errors
            console.error("Response Error:", error.response.data);
            toast.error(
              `Error: ${error.response.data.message || "An issue occurred."}`,
              { position: "top-center" }
            );
          } else {
            console.error("General Error:", error.message);
            toast.error("An unexpected error occurred. Please try again.", {
              position: "top-center",
            });
          }
        }
      };
      
    return (
        <div className="complaints-section container">
            <div className='complaints-holder'>
                <h1 className='complaints-heading'>Complaints Received</h1>

                {user && user.role === "citizen" && (
                    <Link to="search-canid">
                        <button className="complaint-request">
                            Raise Complaint <IoIosAlert className="icon" />
                        </button>
                    </Link>
                )}

                {Array.isArray(complaints) && complaints.length > 0 ? (
                    complaints.map((complaint, index) => (
                        <div className="complaint-content" key={complaint._id}>
                            <div className="complaint-content-item">
                                <span className='complaint-section-title'>Complaint ID: </span> <span>{complaint._id}</span>
                            </div>
                            <div className="complaint-content-item">
                                <span className='complaint-section-title' style={{ textTransform: "capitalize" }}>User: </span> <span>{complaint.name}</span>
                            </div>
                            <div className="complaint-content-item">
                                <span className='complaint-section-title'>CAN ID: </span> <span>{complaint.canId}</span>
                            </div>
                            <div className="complaint-content-item">
                                <span className='complaint-section-title'>Email: </span> <span>{complaint.email}</span>
                            </div>
                            <div className="complaint-content-item">
                                <span className='complaint-section-title'>Mobile Number: </span> <span>{complaint.mobile}</span>
                            </div>
                            <div className="complaint-content-item">
                                <span className='complaint-section-title'>Subject: </span> <span>{complaint.subject}</span>
                            </div>
                            <div className="complaint-content-item">
                                <span className='complaint-section-title'>Description: </span> <span>{complaint.description}</span>
                            </div>
                            {user && (user.role === "admin" || user.role === "engineer") && (
                                <>
                                    <div className="complaint-content-item">
                                        <span className='complaint-section-title'>Problem is resolved?</span>
                                    </div>
                                    <div className="buttons">
                                        <button className="complaint-button" onClick={() => handleYesClick(complaint._id)}>Yes</button>
                                        <button className="complaint-button" onClick={() => handleNoClick(complaint._id)}>No</button>
                                        <button className="complaint-button" onClick={() => handleAssignComplaint(complaint)}>Assign worker</button>
                                    </div>
                                </>
                            )}
                        </div>
                    ))
                ) : (
                    <h3>No complaints received so far</h3>
                )}

                {/* Render child routes if any */}
                <Outlet />
            </div>

            {/* Toast Container */}
            <ToastContainer />
        </div>
    );
};

export default ComplaintList;

























// import React from 'react';

// const ComplaintList = () => {

//     const complaints = [
//         {
//           _id: "C12345",
//           name: "John Doe",
//           canId: "CAN00123",
//           email: "john.doe@example.com",
//           mobile: "1234567890",
//           subject: "Internet not working",
//           description: "The internet has been down for 3 days despite multiple complaints.",
//         },
//         {
//           _id: "C12346",
//           name: "Jane Smith",
//           canId: "CAN00124",
//           email: "jane.smith@example.com",
//           mobile: "9876543210",
//           subject: "Billing issue",
//           description: "I have been overcharged on my last bill by $50.",
//         },
//         {
//           _id: "C12347",
//           name: "Sam Wilson",
//           canId: "CAN00125",
//           email: "sam.wilson@example.com",
//           mobile: "1122334455",
//           subject: "Slow internet speed",
//           description: "The internet speed is very slow compared to the promised plan speed.",
//         },
//       ];
      
    
//     return(
//         <div className="complaints-section container">
//                 {/* {alert(user.role)} */}
//                 <div className='complaints-holder'>
//                     <h1 className='complaints-heading'>Complaints Received</h1>
//                     {Array.isArray(complaints) && complaints.map((complaint, index) => (
//                         <div className="complaint-content" key={index}>
                       
//                             <div className="complaint-content-item">
//                                 <span className='complaint-section-title'>Complaint ID:   </span> <span> {complaint._id}</span>                                
//                             </div>

//                             <div className="complaint-content-item">
//                                 <span className='complaint-section-title' style={{textTransform:"capitalize"}}>User: </span> <span>{complaint.name}</span>                                
//                             </div>

//                             <div className="complaint-content-item">
//                                 <span className='complaint-section-title'>CAN ID:   </span>  <span>{complaint.canId}</span>                                
//                             </div>

//                             <div className="complaint-content-item">
//                                 <span className='complaint-section-title'>Email:   </span>    <span>{complaint.email}</span>                                
//                             </div>

//                             <div className="complaint-content-item">
//                                 <span className='complaint-section-title'>Mobile Number:   </span> <span>{complaint.mobile}</span>                                
//                             </div>

//                             <div className="complaint-content-item">
//                                 <span className='complaint-section-title'>Subject:   </span> <span>{complaint.subject}</span>                                
//                             </div>

//                             <div className="complaint-content-item">
//                                 <span className='complaint-section-title'>Description:   </span> <span>{complaint.description}</span>                                
//                             </div>

//                             <div className="complaint-content-item">
//                                 <span className='complaint-section-title'>Problem is resolved?</span>                                
//                             </div>

//                             <div className="buttons">
//                                 <button className="complaint-button" onClick={()=>handleYesClick(complaint._id)}>Yes</button>
//                                 <button className="complaint-button" onClick={()=>handleNoClick(complaint._id)}>No</button>
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//             </div>
//     );
// }

// export default ComplaintList;
