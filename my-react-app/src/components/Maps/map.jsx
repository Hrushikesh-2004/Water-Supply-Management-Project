import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { MdContentCopy } from "react-icons/md";
import './maps.css'

const Map = () => {
  const location = useLocation();
  const [showInstructions, setShowInstructions] = useState(false);
  const [coordinates, setCoordinates] = useState({});

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const isAddPointRedirect = queryParams.get('source') === 'addPoint';

    if (isAddPointRedirect) {
      const latitude = queryParams.get('latitude');
      const longitude = queryParams.get('longitude');
      const can = queryParams.get('can');
      setCoordinates({latitude:latitude, longitude:longitude, can:can})
      setShowInstructions(true);
    }
  }, [location.search]);

  const copyToClipboard = (elementId) => {
    const element = document.getElementById(elementId);
    const range = document.createRange();
    range.selectNode(element);
    document.getSelection().removeAllRanges();
    document.getSelection().addRange(range);
    document.execCommand('copy');
    document.getSelection().removeAllRanges();
    alert('Copied to clipboard');
  }

  return (
    <div className='add-point-by-coords'>
      {showInstructions && (
        <div className='map-rules'>
          <h2>Guidelines for Adding a Point:</h2>
            <ol>
                <li>Click the <strong>"Add Point by Coordinates"</strong> button.</li>
                <li>Complete the details in the popup form accurately.</li>
                <li>Copy and paste the coordinates provided below into the respective <strong>longitude and latitude fields.</strong></li>

                <li><strong>CAN ID: </strong><span id='can'>{coordinates.can}</span><MdContentCopy className='copy-icon' title='Copy' onClick={() => copyToClipboard('can')}/></li>

                <li><strong>Longitude:</strong> <span id="longitude">{coordinates.longitude}</span><MdContentCopy className='copy-icon' title='Copy' onClick={() => copyToClipboard('longitude')}/></li>

                <li><strong>Latitude:</strong> <span id='latitude'>{coordinates.latitude}</span><MdContentCopy className='copy-icon' title='Copy' onClick={() => copyToClipboard('latitude')}/></li>
                <li>Submit the form to <strong>successfully save</strong> the point.</li>
            </ol>
        </div>
      )}

      <div style={{ marginTop: '20px', padding: '10px 20px' }}>
        <iframe
          src="./index2.html"
          width="100%"
          height="700px"
          tabIndex="0"
        />
      </div>
    </div>
  );
};

export default Map;