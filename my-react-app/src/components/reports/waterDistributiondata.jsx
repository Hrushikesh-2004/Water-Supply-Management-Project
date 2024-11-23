import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

// Styled Components
const Container = styled.div`
  @import './WaterDistributionData.css';
`;

const Title = styled.h1`
  @import './WaterDistributionData.css';
`;

const DropdownContainer = styled.div`
  @import './WaterDistributionData.css';
`;

const SelectedJunction = styled.div`
  @import './WaterDistributionData.css';
`;

const JunctionList = styled.ul`
  @import './WaterDistributionData.css';
`;

const JunctionItem = styled.li`
  @import './WaterDistributionData.css';
`;

const SelectedJunctionInfo = styled.div`
  @import './WaterDistributionData.css';
`;

const HousesTitle = styled.h2`
  @import './WaterDistributionData.css';
`;

const HousesList = styled.ul`
  @import './WaterDistributionData.css';
`;

const HouseItem = styled.li`
  @import './WaterDistributionData.css';
  cursor: pointer; /* Add cursor pointer for clickable items */
`;

const HouseInfo = styled.div`
  @import './WaterDistributionData.css';
  margin-top: 10px;
`;

const SearchBar = styled.input`
  margin-top: 10px;
  padding: 5px;
  width: 100%;
  box-sizing: border-box;
`;

const LoadingSpinner = styled.div`
  @import './WaterDistributionData.css';
`;

const ErrorMessage = styled.div`
  @import './WaterDistributionData.css';
`;


const WaterDistributionData = () => {
  const [junctionData, setJunctionData] = useState({ junctionCounts: {}, houseids: {} });
  const [usersData, setUsersData] = useState({});
  const [selectedJunction, setSelectedJunction] = useState(null);
  const [selectedHouse, setSelectedHouse] = useState(null);
  const [junctionSearchTerm, setJunctionSearchTerm] = useState('');
  const [houseSearchTerm, setHouseSearchTerm] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:5001/reports/getWaterDistributionData', {
          mode: 'cors',
        });
        setJunctionData(response.data);
      } catch (error) {
        setError('Error fetching data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    const fetchCanIdData = async () => {
      try {
        const response = await axios.get('http://localhost:5001/connection/acceptedconnectionslist');
  
        const dat = response.data.data;
        // console.log(dat);
  
        const updatedUsersData = { ...usersData };
        Object.values(dat).forEach((value) => {
          updatedUsersData[value.can] = {
            Name: value.name,
            Address: value.address,
            City: value.city,
            Pincode: value.pincode,
          };
        });
  
        setUsersData(updatedUsersData); // Update the state
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    
    fetchCanIdData();
  }, []);

  const handleJunctionClick = (junctionId) => {
    setSelectedJunction(junctionId);
    setDropdownOpen(false);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleJunctionSearch = (event) => {
    const searchQuery = event.target.value.toLowerCase();
    setJunctionSearchTerm(searchQuery);

    const foundJunction = Object.keys(junctionData.junctionCounts).find(
      (junctionId) => junctionId === searchQuery
    );

    if (foundJunction) {
      setSelectedJunction(foundJunction);
      setDropdownOpen(false);
    } else {
      setSelectedJunction(null);
    }
  };

  const handleHouseSearch = (event) => {
    const searchQuery = event.target.value;
    setHouseSearchTerm(searchQuery);
  };

  const handleHouseClick = (houseId) => {
    setSelectedHouse(houseId);
  };

  return (
    <Container className="water-distribution-container">
      <Title>Water Distribution Information</Title>
      <SearchBar
        type="text"
        placeholder="Search Junction"
        value={junctionSearchTerm}
        onChange={handleJunctionSearch}
      />

      <DropdownContainer className="dropdown-container">
        <SelectedJunction onClick={toggleDropdown}>
          {selectedJunction ? `Junction ${selectedJunction}` : 'Select a Junction'}
        </SelectedJunction>

        <JunctionList className="junction-list" open={dropdownOpen}>
          {Object.keys(junctionData.junctionCounts).map((junctionId) => (
            <JunctionItem
              key={junctionId}
              onClick={() => handleJunctionClick(junctionId)}
              className={selectedJunction === junctionId ? 'active' : ''}
            >
              Junction {junctionId} - {junctionData.junctionCounts[junctionId]} houses
            </JunctionItem>
          ))}
        </JunctionList>
      </DropdownContainer>

      {/* Houses Search Bar */}
      <SearchBar
        type="text"
        placeholder="Search Houses"
        value={houseSearchTerm}
        onChange={handleHouseSearch}
      />

      {selectedJunction && !loading && !error && (
        <SelectedJunctionInfo className="selected-junction-info">
          <HousesTitle className="houses-title">
            Houses under Junction {selectedJunction}
          </HousesTitle>
          <HousesList className="houses-list">
            {junctionData.houseids[selectedJunction]
              .filter((houseId) => houseId.includes(houseSearchTerm))
              .map((houseId) => (
                <HouseItem
                  key={houseId}
                  className={`house-item ${selectedHouse === houseId ? 'active' : ''}`}
                  onClick={() => handleHouseClick(houseId)}
                >
                  {houseId}
                  {selectedHouse === houseId && (
                    <HouseInfo>
                      <div>Name: {usersData[houseId]?.Name}</div>
                      <div>Address: {usersData[houseId]?.Address}</div>
                      <div>City: {usersData[houseId]?.City}</div>
                      <div>Pincode: {usersData[houseId]?.Pincode}</div>
                    </HouseInfo>
                  )}

                </HouseItem>
              ))}
          </HousesList>
        </SelectedJunctionInfo>
      )}
    </Container>
  );
};

export default WaterDistributionData;

