import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import {jwtDecode} from "jwt-decode";
import { useCookies } from "react-cookie";
import { toast } from "react-toastify";

const RaiseComplaint = () => {
  const [formData, setFormData] = useState({
    name: "",
    canId: "",
    email: "",
    mobile: "",
    subject: "",
    description: "",
  });

  const [connections, setConnections] = useState([]);
  const [cookies] = useCookies(["access_token"]);
  const user = cookies.access_token ? jwtDecode(cookies.access_token) : null;

  const navigate = useNavigate();
  const location = useLocation();
  const canId = location.state?.message;

  // Fetch user connections on component mount
  useEffect(() => {
    const fetchConnections = async () => {
      if (user?.name) {
        try {
          const response = await axios.post(
            "http://localhost:5001/connection/searchuserconnection",
            { name: user.name }
          );
          setConnections(response.data);
        } catch (error) {
          console.error("Error fetching connections:", error);
        }
      }
    };

    fetchConnections();
  }, [user?.name]);

  // Update form data on user or location state change
  useEffect(() => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      name: user?.name || "",
      canId: canId || "",
    }));
  }, [user?.name, canId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5001/complaints/postcomplaint",
        formData
      );
      console.log("Complaint submitted successfully:", response.data);
      toast.success("Complaint raised successfully!", { position: "top-center" });
      setTimeout(()=>{},2000)
      navigate("/complaints");
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error(
        error.response?.status === 400
          ? "CAN ID not found"
          : "An error occurred while submitting the complaint. Please try again.",
        { position: "top-center" }
      );
    }
  };

  return (
    <div className="raise-complaint-section container">
      <div className="raise-complaint-content">
        <h2>Raise Complaint</h2>
        <form onSubmit={handleSubmit} className="raise-complaint-form">
          <div className="form-group">
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              readOnly
              disabled
              className="input-field"
            />
          </div>

          <div className="form-group">
            <label>CAN ID:</label>
            <input
              type="text"
              name="canId"
              value={formData.canId}
              readOnly
              disabled
              className="input-field"
            />
          </div>

          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="input-field"
              required
            />
          </div>

          <div className="form-group">
            <label>Mobile:</label>
            <input
              type="tel"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              placeholder="Enter your mobile number"
              className="input-field"
              required
            />
          </div>

          <div className="form-group">
            <label>Subject:</label>
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder="Enter the subject"
              className="input-field"
              required
            />
          </div>

          <div className="form-group">
            <label>Description:</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe your complaint"
              className="input-field"
              rows="5"
              required
            />
          </div>

          <div className="raise-complaint-buttons">
            <button type="submit" className="submit-button">
              Submit
            </button>
            <button
              type="button"
              className="cancel-button"
              onClick={() => {
                navigate("/complaints");
                window.location.reload();
              }}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RaiseComplaint;
