import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const SearchCanId = () => {
  const [canId, setCanId] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCanId(e.target.value);
    setError(null); // Clear any error messages when input changes
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!canId) {
      setError('Please enter a valid CAN ID.');
      return;
    }

    setLoading(true); // Show loading state
    try {
      const response = await axios.get(
        `http://localhost:5001/complaints/search-canid/${canId}`
      );
      toast.success('CAN ID found: ', {positon:'top-center'} );

      // Navigate to RaiseComplaint with CAN ID
      navigate('/complaints/raise-complaint', { state: { message: canId } });
    } catch (error) {
      console.error('Error fetching CAN ID:', error);
      toast.error('CAN ID not found. Please try again.',{positon:'top-center'} );
    } finally {
      setLoading(false); // Remove loading state
    }
  };

  return (
    <div>
      {(
        <div className="search-can-container">
            <span className="close">
              <Link to="/complaints" className="close-icon">
                &times;
              </Link>
            </span>
            <h1 className="form-title">Raise Complaint</h1>
            <form className="connection-form" onSubmit={handleSubmit}>
            <label htmlFor="canId">CAN ID</label>
              <input
                type="number"
                name="pincode"
                placeholder="CanId"
                value={canId}
                onChange={handleChange}
                className="input-field"
              />
              {error && <div className="error-message">{error}</div>}
              <button type="submit" className="submit-button" disabled={loading}>
                {loading ? 'Checking...' : 'Check CAN'}
              </button>
            </form>
          
        </div>
      )}
    </div>
  );
};

export default SearchCanId;
