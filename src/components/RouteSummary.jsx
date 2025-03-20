import React from 'react';

const RouteSummary = ({ stats, schedule, waypoints }) => {
  // Format activity type for display
  const formatActivityType = (type) => {
    switch(type) {
      case 'DRIVING': return 'Driving';
      case 'REST': return '10-hour Rest';
      case 'BREAK': return '30-minute Break';
      case 'FUEL': return 'Fuel Stop';
      case 'PICKUP': return 'Pickup';
      case 'DROPOFF': return 'Dropoff';
      default: return type;
    }
  };
  
  // Format duration
  const formatDuration = (hours) => {
    const wholeHours = Math.floor(hours);
    const minutes = Math.round((hours - wholeHours) * 60);
    
    if (minutes === 0) {
      return `${wholeHours} hr`;
    } else {
      return `${wholeHours} hr ${minutes} min`;
    }
  };
  
  // Find location name by index
  const getLocationName = (index) => {
    if (!waypoints || index >= waypoints.length) {
      return `Location ${index}`;
    }
    return waypoints[index]?.name || `Location ${index}`;
  };
  
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 bg-blue-50 rounded border border-blue-100">
          <p className="text-sm text-blue-700 font-medium">Total Distance</p>
          <p className="text-2xl font-bold">{stats.total_distance.toFixed(1)} miles</p>
        </div>
        
        <div className="p-4 bg-green-50 rounded border border-green-100">
          <p className="text-sm text-green-700 font-medium">Driving Time</p>
          <p className="text-2xl font-bold">{formatDuration(stats.total_driving_hours)}</p>
        </div>
        
        <div className="p-4 bg-purple-50 rounded border border-purple-100">
          <p className="text-sm text-purple-700 font-medium">Total Days</p>
          <p className="text-2xl font-bold">{stats.total_trip_days}</p>
        </div>
      </div>
      
      <div>
        <h3 className="font-medium mb-2">Trip Schedule</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2 text-left border">Day</th>
                <th className="p-2 text-left border">Activity</th>
                <th className="p-2 text-left border">Location</th>
                <th className="p-2 text-left border">Duration</th>
                <th className="p-2 text-left border">Time</th>
              </tr>
            </thead>
            <tbody>
              {schedule && schedule.map((item, index) => (
                <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  <td className="p-2 border">{item.day}</td>
                  <td className="p-2 border">
                    <span 
                      className={`py-1 px-2 text-xs font-medium rounded ${
                        item.activity_type === 'DRIVING' ? 'bg-blue-100 text-blue-800' :
                        item.activity_type === 'REST' ? 'bg-purple-100 text-purple-800' :
                        item.activity_type === 'BREAK' ? 'bg-green-100 text-green-800' :
                        item.activity_type === 'FUEL' ? 'bg-yellow-100 text-yellow-800' :
                        item.activity_type === 'PICKUP' ? 'bg-indigo-100 text-indigo-800' :
                        item.activity_type === 'DROPOFF' ? 'bg-red-100 text-red-800' :
                        'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {formatActivityType(item.activity_type)}
                    </span>
                  </td>
                  <td className="p-2 border">{getLocationName(item.location_index)}</td>
                  <td className="p-2 border">{formatDuration(item.duration_hours)}</td>
                  <td className="p-2 border">
                    {item.start_duty_hours.toFixed(1)} - {item.end_duty_hours.toFixed(1)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default RouteSummary;