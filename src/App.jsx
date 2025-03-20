import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./App.css";
import TripForm from "./components/TripForm";
import RouteMap from "./components/RouteMap";
import RouteSummary from "./components/RouteSummary";
import ELDLogs from "./components/ELDLogs";
import axios from "axios";
import dumm from "./m";

function App() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [routeData, setRouteData] = useState(null);
  const [isOpen, setIsOpen] = useState(true);

  const calculateRoute = async (formData) => {
    try {
      setLoading(true);
      setError(null);

      const response = await axios.post(
        "https://eld-planner.onrender.com/api/calculate/",
        formData
      );
      setRouteData(response.data);
      console.log(response.data);
      setLoading(false);
    } catch (err) {
      setError(err.response?.data?.error || "An error occurred");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-blue-600 text-white p-4 shadow-md">
        <div className="container mx-auto">
          <h1 className="text-2xl font-bold">Spotter Labs ELD Planner</h1>
          <p className="text-sm">Plan your routes</p>
        </div>
      </header>

      <main className="container mx-auto p-4">
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="route"
              initial={{ x: "-100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "-100%", opacity: 0 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="grid grid-cols-1 md:grid-cols-3 gap-4"
            >
              <div className="md:col-span-1 bg-white p-4 rounded shadow">
                <TripForm onSubmit={calculateRoute} loading={loading} />

                {error && (
                  <div className="mt-4 p-3 bg-red-100 text-red-700 rounded">
                    {error}
                  </div>
                )}
              </div>

              <div className="md:col-span-2">
                {routeData ? (
                  <div className="space-y-6">
                    <div className="bg-white p-4 rounded shadow">
                      <h2 className="text-xl font-semibold mb-4">Route Map</h2>
                      <RouteMap
                        waypoints={routeData.waypoints}
                        routeSegments={routeData.route_segments}
                      />
                      <button
                        onClick={() => setIsOpen(false)}
                        className="my-3 w-28 py-2 px-4 rounded text-white font-medium bg-blue-500 cursor-pointer"
                      >
                        ELD Logs
                      </button>
                    </div>

                    <div className="bg-white p-4 rounded shadow">
                      <h2 className="text-xl font-semibold mb-4">
                        Route Summary
                      </h2>
                      <RouteSummary
                        stats={routeData.stats}
                        schedule={routeData.schedule}
                        waypoints={routeData.waypoints}
                      />
                    </div>
                  </div>
                ) : (
                  <div className="bg-white p-8 rounded shadow text-center">
                    <p className="text-gray-500">
                      Enter trip details to calculate your route and generate ELD logs
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="eldlogs"
              initial={{ x: "100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "100%", opacity: 0 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="p-4"
            >
              <button
                onClick={() => setIsOpen(true)}
                className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50 cursor-pointer"
              >
                Back
              </button>
              <div className="flex justify-center">
                <ELDLogs eldLogs={routeData.eld_logs} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <footer className="mt-8 bg-gray-100 p-4 text-center text-gray-600">
        <p>&copy; 2025 ELD Route Planner</p>
      </footer>
    </div>
  );
}

export default App;
