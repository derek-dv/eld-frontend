import React from "react";

const ELDModal = ({ close, eldLogs }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-90 z-50">
      <div className="relative bg-gray-900 text-white p-6 rounded-lg w-11/12 max-w-5xl z-50">
        <button
          onClick={close}
          className="absolute top-3 right-3 text-white text-lg"
        >
          ✖
        </button>

        <h2 className="text-2xl font-semibold mb-4">ELD Logs</h2>
        <div className="max-h-[80vh] overflow-y-auto">
          {eldLogs.map((log, index) => (
            <div key={index} className="mb-4 p-4 border border-gray-700">
              <h3 className="text-lg font-semibold">Day {log.day}</h3>
              <p>{log.details}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ELDModal;
 