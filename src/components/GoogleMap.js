import React, {useState} from 'react';
import GoogleMapReact from 'google-map-react';
import { Icon } from '@iconify/react'
import locationIcon from '@iconify/icons-mdi/map-marker';
import '../map.css';

export const LocationPin = ({ resultCoordinates }) => (
  
  <div className="pin">
    <Icon icon={locationIcon} className="pin-icon" />
    <p className="pin-icon">{resultCoordinates}</p>
  </div>
)
const mapStyles = {
  width: "99vw",
  height: "auto",
  frameborder: "0",
  style: "border:0",
  margin: "0 auto",
}
function Map() {
  const defaultProps = {
    center: {
      lat: 40.915488,
      lng:  -96.677629
    },
    zoom: 4
  };

  return (

    <div style={mapStyles}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.REACT_APP_API_KEY }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
      >
        <LocationPin
          lat={40.915488}
          lng={-96.677629}
          text={`MidPoint`}
        />
      </GoogleMapReact>
    </div>
  );
  }

export default Map;

