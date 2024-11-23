import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { useCookies } from 'react-cookie';
import { IoAddCircleSharp } from 'react-icons/io5';
import { Link, Outlet } from 'react-router-dom';

function YourConnections() {
  const [connections, setConnections] = useState([]);
  const [cookies, setCookies] = useCookies(['access_token']);
  const user = cookies.access_token ? jwtDecode(cookies.access_token) : null;

  useEffect(() => {
    const fetchConnections = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5001/connection/searchuserconnection/${user.name}`
        );
        setConnections(response.data);
      } catch (error) {
        console.error('Error fetching connections:', error);
      }
    };
    fetchConnections();
  }, [connections]);

  return (
    <div className="connections-section container">
      <div className="connections-holder">
        <h1 className="connections-heading">Your Connections</h1>

        {connections.data ? (
          <Link to="/your-connections/request-connection">
            <button
              className="connection-request"
              disabled
              title="Connections already exist"
              style={{ cursor: 'not-allowed' }}
            >
              Request Connection
              <IoAddCircleSharp className="icon" />
            </button>
          </Link>
        ) : (
          <Link to="/your-connections/request-connection">
            <button className="connection-request">
              Request Connection
              <IoAddCircleSharp className="icon" />
            </button>
          </Link>
        )}

        <div>
          {/* Use Outlet here to render child routes */}
          <Outlet />
        </div>

        <div>
          {connections.data ? (
            <div className="connection-content">
              <div className="connection-content-item">
                <h3 className="connections-subheading">
                  <strong>CAN Number: {connections.data.can}</strong>
                </h3>
              </div>

              <div className="connection-content-item">
                <span className="connection-section-title">Name: </span>
                <span>{connections.data.name}</span>
              </div>

              <div className="connection-content-item">
                <span className="connection-section-title">Address: </span>
                <span>{connections.data.address}</span>
              </div>

              <div className="connection-content-item">
                <span className="connection-section-title">City: </span>
                <span>{connections.data.city}</span>
              </div>

              <div className="connection-content-item">
                <span className="connection-section-title">Pincode: </span>
                <span>{connections.data.pincode}</span>
              </div>

              <div className="connection-content-item">
                <span className="connection-section-title">Coordinates: </span>
                <span>
                  Latitude: {connections.data.latitude} &nbsp; Longitude:{' '}
                  {connections.data.longitude}
                </span>
              </div>

              <div className="connection-content-item">
                <span className="connection-section-title">Description: </span>
                <span>{connections.data.description}</span>
              </div>
            </div>
          ) : (
            <h3>You do not currently have an active water connection</h3>
          )}
        </div>
      </div>
    </div>
  );
}

export default YourConnections;
