  import { useEffect, useState } from "react";
  import axios from "axios";
  import { useNavigate } from "react-router-dom";
  
  const ReceivedConnections = () => {
      const [connections, setConnections] = useState([]);
      const navigate = useNavigate();
  
      // Fetch the connections when the component mounts
      useEffect(() => {
          const fetchConnections = async () => {
              try {
                  const response = await axios.get('http://localhost:5001/connection/receivedconnections');
                  setConnections(response.data);
                  console.log("Connections fetched successfully", response.data);
              } catch (error) {
                  console.log("Error while fetching data:", error);
              }
          };
  
          fetchConnections();
      }, []);
  
      // Handle the Accept Connection button click
      const handleAcceptClick = async (Id) => {
        try {
          const response = await axios.delete(`http://localhost:5001/connection/acceptconnection/${Id}`);
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
    
          // Handle success or redirect to map section
          console.log(`Connection with id ${connections._id} accepted successfully`);
        } catch (error) {
          console.error('Error:', error);
        }
      };        
      // Handle the Add Point on Map button click
      const handleAddPointClick = (id, latitude, longitude) => {
          console.log(`Added point on map for connection ID: ${id}`);
          
          // Navigate to a map page or show a map modal with the selected coordinates
          navigate(`/map`, { state: { latitude, longitude, id } });
      };
  
      return (
          <div className="connections-section container">
              <div className="connections-holder">
                  <h1 className="connections-heading">Connections Received</h1>
                  {Array.isArray(connections) &&
                      connections.map((connection, index) => (
                          <div className="connection-content" key={index}>
                              <div className="connection-content-item">
                                  <h3 className="connections-subheading">
                                      CAN Number: {connection.can}
                                  </h3>
                              </div>
  
                              <div className="connection-content-item">
                                  <span className="connection-section-title">Name: </span>
                                  <span>{connection.name}</span>
                              </div>
  
                              <div className="connection-content-item">
                                  <span className="connection-section-title">Address: </span>
                                  <span>{connection.address}</span>
                              </div>
  
                              <div className="connection-content-item">
                                  <span className="connection-section-title">City: </span>
                                  <span>{connection.city}</span>
                              </div>
  
                              <div className="connection-content-item">
                                  <span className="connection-section-title">Pincode: </span>
                                  <span>{connection.pincode}</span>
                              </div>
  
                              <div className="connection-content-item">
                                  <span className="connection-section-title">Coordinates: </span>
                                  <span>Lattitude: {connection.latitude} &nbsp; Longitude: {connection.longitude}</span>
                              </div>
  
                              <div className="connection-content-item">
                                  <span className="connection-section-title">Description: </span>
                                  <span>{connection.description}</span>
                              </div>
  
                              <div className="buttons">
                                  <button
                                      className="connection-button"
                                      onClick={() => handleAcceptClick(connection._id)}
                                  >
                                      Accept Connection
                                  </button>
                                  <button
                                      className="connection-button"
                                      onClick={() => handleAddPointClick(connection._id, connection.latitude, connection.longitude)}
                                  >
                                      Add Point on Map
                                  </button>
                              </div>
                          </div>
                      ))}
              </div>
          </div>
      );
  };
  
  export default ReceivedConnections;
  