import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for the missing marker icons in react-leaflet
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

// Custom marker icons for different waypoint types
const markerIcons = {
  START: new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  }),
  PICKUP: new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  }),
  DROPOFF: new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  }),
  REST: new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-violet.png',
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  }),
  FUEL: new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-yellow.png',
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  })
};

const RouteMap = ({ waypoints, routeSegments }) => {
  // Calculate center and bounds
  const calculateCenter = () => {
    if (!waypoints || waypoints.length === 0) {
      return [39.8283, -98.5795]; // Center of the US
    }
    
    const lats = waypoints.map(wp => wp.lat);
    const lngs = waypoints.map(wp => wp.lng);
    
    const centerLat = (Math.max(...lats) + Math.min(...lats)) / 2;
    const centerLng = (Math.max(...lngs) + Math.min(...lngs)) / 2;
    
    return [centerLat, centerLng];
  };
  
  // Extract route polyline coordinates
  const getRouteLines = () => {
    if (!routeSegments || routeSegments.length === 0) {
      return [];
    }
    
    return routeSegments.map(segment => {
      return segment.geometry.coordinates.map(coord => [coord[1], coord[0]]);
    });
  };
  
  const center = calculateCenter();
  const routeLines = getRouteLines();
  console.log(waypoints)
  
  return (

    <MapContainer center={center} zoom={5} scrollWheelZoom={true}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      
      {waypoints && waypoints.map((waypoint, index) => (
        <Marker 
          key={index} 
          position={[waypoint.lat, waypoint.lng]}
          icon={markerIcons[waypoint.type] || DefaultIcon}
        >
          <Popup>
            <div className="font-medium">{waypoint.name}</div>
            <div className="text-sm">{waypoint.type}</div>
          </Popup>
        </Marker>
      ))}
      
      {routeLines.map((line, index) => (
        <Polyline 
          key={index} 
          positions={line} 
          color={index === 0 ? "blue" : "green"} 
          weight={4} 
        />
      ))}
    </MapContainer>
  );
};

export default RouteMap;