import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import {jwtDecode} from 'jwt-decode';
import { MapContainer, TileLayer, Marker, Popup, FeatureGroup } from 'react-leaflet';
import { EditControl } from 'react-leaflet-draw';
import L from 'leaflet';

import locationImg from './blue.png';
import { toast } from 'react-toastify';

const markerIcon = new L.Icon({
  iconUrl: locationImg,
  iconSize: [35, 45],
  iconAnchor: [6, 45],
  popupAnchor: [0, -46],
});

const RequestConnection = () => {
  const [cookies] = useCookies(['access_token']);
  const user = cookies.access_token ? jwtDecode(cookies.access_token) : null;

  const [isChecked, setIsChecked] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    address: '',
    city: '',
    pincode: '',
    latitude: null,
    longitude: null,
  });

  const navigate = useNavigate();

  const MAX_ACCURACY = 5;

  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleMapClick = (e) => {
    const { lat, lng } = e.latlng;
    setFormData({ ...formData, latitude: lat, longitude: lng });
  };

  const handleShapeCreated = (e) => {
    const { layerType, layer } = e;
    if (layerType === 'marker') {
      const { lat, lng } = layer.getLatLng();
      setFormData({ ...formData, latitude: lat, longitude: lng });
      console.log(`Marker created at Latitude: ${lat}, Longitude: ${lng}`);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log('Submitting form data:', formData);
      const response = await axios.post('http://localhost:5001/connection/addconnection', formData);

      toast.success('Request for a new connection successfully sent',{positon:'top-center'} );
      navigate('/your-connections');
    } catch (error) {
      toast.error('Error submitting form:', {positon:'top-center'} );
    }
  };

  useEffect(() => {
    console.log('Map center updated:', formData.latitude, formData.longitude);
  }, [formData.latitude, formData.longitude]);

  useEffect(() => {
    const getLocation = async () => {
      if ('geolocation' in navigator) {
        try {
          let position = null;
          while (position === null || position.coords.accuracy > MAX_ACCURACY) {
            position = await new Promise((resolve, reject) => {
              navigator.geolocation.getCurrentPosition(resolve, reject);
            });
            const { latitude, longitude, accuracy } = position.coords;
            setFormData({ ...formData, latitude, longitude, accuracy });
            console.log(`Latitude: ${latitude}, Longitude: ${longitude}, Accuracy: ${accuracy}`);
          }
        } catch (error) {
          console.error('Error getting location:', error);
        }
      } else {
        console.error('Geolocation is not supported in your browser.');
      }
    };

    if (isChecked) getLocation();
  }, [isChecked]);

  return (
    <div className="request-connection-container">
      <h2 className="form-title">Request a New Water Connection</h2>
      <form className="request-connection-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="address"
          placeholder="Address"
          value={formData.address}
          onChange={handleChange}
          className="input-field"
          required={!isChecked}
        />
        <input
          type="text"
          name="city"
          placeholder="City"
          value={formData.city}
          onChange={handleChange}
          className="input-field"
          required
        />
        <input
          type="number"
          name="pincode"
          placeholder="Pincode"
          value={formData.pincode}
          onChange={handleChange}
          className="input-field"
          required
        />

        <div className="checkbox-section">
          <label>
            <input
              type="checkbox"
              checked={isChecked}
              onChange={handleCheckboxChange}
            />
            Use my live location instead of providing an address.
          </label>
        </div>

        <div className="map-section">
          {formData.latitude && formData.longitude && (
            <MapContainer
              center={[formData.latitude, formData.longitude]}
              zoom={13}
              style={{ height: '400px', width: '100%' }}
              onClick={handleMapClick}
            >
              <FeatureGroup>
                <EditControl
                  position="topright"
                  onCreated={handleShapeCreated}
                  draw={{
                    rectangle: false,
                    polygon: false,
                    polyline: false,
                    circlemarker: false,
                    circle: false,
                  }}
                />
              </FeatureGroup>
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              <Marker position={[formData.latitude, formData.longitude]} icon={markerIcon}>
                <Popup>Your Selected Location</Popup>
              </Marker>
            </MapContainer>
          )}
        </div>

        <div className="map-rules">
          <h2>Rules for Locating Point:</h2>
          <ol>
            <li>Ensure that you provide a <strong>valid address.</strong></li>
            <li>If the map is not loaded properly, please <strong>reload the page.</strong></li>
            <li>If the point is not accurately placed on the map, please <strong>reload the page.</strong></li>
            <li>If no specific location is indicated on the map, your <strong>live location will be considered.</strong></li>
            <li>If you cannot provide an address or specify a location, <strong>check the designated checkbox.</strong></li>
          </ol>
        </div>

        <button type="submit" className="submit-button">
          Submit Request
        </button>
      </form>
    </div>
  );
};

export default RequestConnection;
