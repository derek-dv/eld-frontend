import React, { useState } from 'react';

const TripForm = ({ onSubmit, loading }) => {
  const [formData, setFormData] = useState({
    current_location: {
      name: '',
      lat: '',
      lng: ''
    },
    pickup_location: {
      name: '',
      lat: '',
      lng: ''
    },
    dropoff_location: {
      name: '',
      lat: '',
      lng: ''
    },
    current_cycle_hours: ''
  });
  
  const handleChange = (e, locationKey, field) => {
    const { value } = e.target;
    
    if (locationKey) {
      setFormData({
        ...formData,
        [locationKey]: {
          ...formData[locationKey],
          [field]: value
        }
      });
    } else {
      setFormData({
        ...formData,
        [e.target.name]: value
      });
    }
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    const preparedData = {
      ...formData,
      current_location: {
        ...formData.current_location,
        lat: parseFloat(formData.current_location.lat),
        lng: parseFloat(formData.current_location.lng)
      },
      pickup_location: {
        ...formData.pickup_location,
        lat: parseFloat(formData.pickup_location.lat),
        lng: parseFloat(formData.pickup_location.lng)
      },
      dropoff_location: {
        ...formData.dropoff_location,
        lat: parseFloat(formData.dropoff_location.lat),
        lng: parseFloat(formData.dropoff_location.lng)
      },
      current_cycle_hours: parseFloat(formData.current_cycle_hours) || 0
    };
    
    onSubmit(preparedData);
  };
  
  const renderLocationFields = (locationKey, label) => (
    <div className="mb-4 p-3 border rounded bg-gray-50">
      <h3 className="font-medium mb-2">{label}</h3>
      
      <div className="mb-2">
        <label className="block text-sm text-gray-600 mb-1">Location Name</label>
        <input
          type="text"
          value={formData[locationKey].name}
          onChange={(e) => handleChange(e, locationKey, 'name')}
          placeholder="e.g., Chicago, IL"
          className="w-full p-2 border rounded"
        />
      </div>
      
      <div className="grid grid-cols-2 gap-2">
        <div>
          <label className="block text-sm text-gray-600 mb-1">Latitude</label>
          <input
            type="number"
            step="0.000001"
            value={formData[locationKey].lat}
            onChange={(e) => handleChange(e, locationKey, 'lat')}
            placeholder="e.g., 41.8781"
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block text-sm text-gray-600 mb-1">Longitude</label>
          <input
            type="number"
            step="0.000001"
            value={formData[locationKey].lng}
            onChange={(e) => handleChange(e, locationKey, 'lng')}
            placeholder="e.g., -87.6298"
            className="w-full p-2 border rounded"
            required
          />
        </div>
      </div>
    </div>
  );
  
  return (
    <form onSubmit={handleSubmit}>
      <h2 className="text-xl font-semibold mb-4">Trip Details</h2>
      
      {renderLocationFields('current_location', 'Current Location')}
      {renderLocationFields('pickup_location', 'Pickup Location')}
      {renderLocationFields('dropoff_location', 'Dropoff Location')}
      
      <div className="mb-4">
        <label className="block font-medium mb-2">
          Current Cycle Hours Used
        </label>
        <input
          type="number"
          name="current_cycle_hours"
          step="0.5"
          min="0"
          max="70"
          value={formData.current_cycle_hours}
          onChange={(e) => handleChange(e)}
          placeholder="Hours used in current 70hr/8day cycle"
          className="w-full p-2 border rounded"
          required
        />
        <p className="text-xs text-gray-500 mt-1">
          Value between 0-70 hours
        </p>
      </div>
      
      <button
        type="submit"
        disabled={loading}
        className={`w-full py-2 px-4 rounded text-white font-medium ${
          loading ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'
        }`}
      >
        {loading ? 'Calculating...' : 'Calculate Route'}
      </button>
    </form>
  );
};

export default TripForm;