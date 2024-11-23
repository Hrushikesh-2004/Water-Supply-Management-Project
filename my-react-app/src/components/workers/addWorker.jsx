import React, { useState } from "react";
import { toast } from "react-toastify";

const AddWorker = () => {
  const [formData, setFormData] = useState({
    name: "",
    phoneNumber: "",
    city: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
      if (formData.password !== formData.confirmPassword) {
        alert("Passwords do not match. Please re-enter.");
        return;
      }
      try {
        // alert(JSON.stringify(formData))
        
        const result = await axios.post('http://localhost:5001/workers/addworker', {
          name: formData.name,
          phoneNumber: formData.phoneNumber,
          email: formData.email,
          city: formData.city,
          password: formData.password,
        });
        toast.success('Worker added successfully!', {position:'top-center'});
        console.log(result.data); // Assuming the server responds with data
        setTimeout(() => window.location.reload(), 1000);
      } catch (error) {
        toast.error('something went wrong !!', {position:'top-center'});
        setTimeout(() => window.location.reload(), 1000);
        console.error('Error:', error);
      }
    };
  

  return (
    <div className="add-worker-section container">

      <div className="add-worker-content">
        <h2>Add Worker</h2>
        <form onSubmit={handleSubmit} className="add-worker-form">
          <div className="form-group">
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter name"
              required
            />
          </div>

          <div className="form-group">
            <label>Phone Number:</label>
            <input
              type="tel"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              placeholder="Enter phone number"
              required
            />
          </div>

          <div className="form-group">
            <label>City:</label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              placeholder="Enter city"
              required
            />
          </div>

          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter email"
              required
            />
          </div>

          <div className="form-group">
            <label>Password:</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter password"
              required
            />
          </div>

          <div className="form-group">
            <label>Confirm Password:</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm password"
              required
            />
          </div>

          {error && <p className="error-message">{error}</p>}
            <div className="add-worker-buttons">

          <button type="submit" className="add-worker-button">
            Add
          </button>
            </div>
        </form>
      </div>
    </div>
  );
};

export default AddWorker;
