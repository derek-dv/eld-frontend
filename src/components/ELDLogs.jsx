import React, { useState } from "react";

const ELDLogs = ({ eldLogs }) => {
  console.log(eldLogs);
  // Sample data for demonstration - multiple days
  const sampleLogs = eldLogs;

  const [selectedDay, setSelectedDay] = useState(1);
  const currentLog =
    sampleLogs.find((log) => log.day === selectedDay) || sampleLogs[0];

  // Navigate to previous day if available
  const goToPreviousDay = () => {
    const currentIndex = sampleLogs.findIndex((log) => log.day === selectedDay);
    if (currentIndex > 0) {
      setSelectedDay(sampleLogs[currentIndex - 1].day);
    }
  };

  // Navigate to next day if available
  const goToNextDay = () => {
    const currentIndex = sampleLogs.findIndex((log) => log.day === selectedDay);
    if (currentIndex < sampleLogs.length - 1) {
      setSelectedDay(sampleLogs[currentIndex + 1].day);
    }
  };

  // Convert 24-hour format to 12-hour format
  const formatHour = (hour) => {
    if (hour === 0 || hour === 12) {
      return 12;
    }
    return hour % 12;
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={goToPreviousDay}
          disabled={selectedDay === sampleLogs[0].day}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          Previous Day
        </button>

        <div className="flex flex-col items-center">
          <select
            value={selectedDay}
            onChange={(e) => setSelectedDay(parseInt(e.target.value))}
            className="mt-2 p-2 border rounded"
          >
            {sampleLogs.map((log) => (
              <option key={log.day} value={log.day}>
                Day {log.day} - {log.date}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={goToNextDay}
          disabled={selectedDay === sampleLogs[sampleLogs.length - 1].day}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          Next Day
        </button>
      </div>
      <div className="w-full max-w-4xl mx-auto bg-white p-4 border rounded shadow">
        <div className="flex justify-between items-center mb-4">
          <div className="flex flex-col items-center">
            <div className="text-2xl font-bold text-center">
              Driver's Daily Log
            </div>
            <p>(24 hours)</p>
          </div>
          <div className="flex">
            <div className="gap-2">
              <div className="flex flex-col items-center">
                <div className="">____________</div>
                <p>(month)</p>
              </div>
            </div>
            <div className="gap-2">
              <div className="flex flex-col items-center">
                <div className="">/____________</div>
                <p>(day)</p>
              </div>
            </div>
            <div className="gap-2">
              <div className="flex flex-col items-center">
                <div className="">/____________</div>
                <p>(year)</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center">
            <div className="">Original - file at home terminal</div>
            <div className="text-sm">
              Duplicate - driver retains in his/her possession for 3 days
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center mb-5">
          <p>From___________________________</p>
          <p>To______________________________</p>
        </div>

        <div className="flex mb-5">
          <div className="flex-auto">
            <div className="flex flex-col gap-5">
              <div className="flex gap-3">
                <div className="w-full">
                  <div className="w-full h-full border p-4"></div>
                  <p className="text-center text-sm">
                    Total miles driving today
                  </p>
                </div>
                <div className="w-full">
                  <div className="w-full h-full border p-4"></div>
                  <p className="text-center text-sm">Total Mileage today</p>
                </div>
              </div>
              <div className="w-full">
                <div className="w-full h-full border p-4"></div>
                <p className="text-center text-sm">
                  Truck/Tractor and Trailer Number or
                </p>
                <p className="text-center text-sm">
                  License plate(s)/State (show each unit)
                </p>
              </div>
            </div>
          </div>
          <div className="flex-auto flex flex-col items-center">
            <div className="">
              <div className="">___________________________</div>
              <p>Name of carrier or carriers</p>
            </div>
            <div className="">
              <div className="">___________________________</div>
              <p>Main address Office</p>
            </div>
            <div className="">
              <div className="">___________________________</div>
              <p>Home terminal address</p>
            </div>
          </div>
        </div>

        <div className="border mb-4">
          <div className="flex">
            <div className="w-28 p-1 border-r">
              <div className="font-semibold text-xs"></div>
            </div>
            <div className="flex-1  bg-black">
              <div className="grid grid-cols-24 gap-0">
                {Array.from({ length: 24 }).map((_, i) => (
                  <div
                    key={i}
                    className="text-xs text-center font-semibold border text-white"
                  >
                    {formatHour(i)}
                  </div>
                ))}
              </div>
            </div>
            <div className="w-16 p-1 border-l text-center">
              <div className="font-semibold text-xs">Hours</div>
            </div>
          </div>

          {/* Off Duty Row */}
          <LogGridRow
            label="1. Off Duty"
            status="OFF"
            currentLog={currentLog}
            calculateHours={true}
          />

          {/* Sleeper Berth Row */}
          <LogGridRow
            label="2. Sleeper Berth"
            status="SB"
            currentLog={currentLog}
            calculateHours={true}
          />

          {/* Driving Row */}
          <LogGridRow
            label="3. Driving"
            status="D"
            currentLog={currentLog}
            calculateHours={true}
          />

          {/* On Duty Row */}
          <LogGridRow
            label="4. On Duty (Not Driving)"
            status="ON"
            currentLog={currentLog}
            calculateHours={true}
          />
        </div>

        <div className="p-2 mb-4">
          <div className="font-semibold mb-2">Remarks:</div>
        </div>

        <div className="border px-3 flex flex-col">
          <div className="font-bold">Shipping</div>
          <div className="font-bold mb-2">Documents:</div>
          <div className="">_________________</div>

          <div className="font-semibold">DVL or Manifest No:</div>
          <div className="font-semibold">Or</div>
          <div className="mb-5">
            <div className="">_________________</div>
            <div className="text-xs mx-auto">Shipper & Commodity</div>
          </div>

          <div className="text-xs text-center">
            Enter name of place you reported and where unloaded from work and
            when and where each change of duty occurred.
          </div>
          <div className="text-xs text-center">
            All time is recorded in standard time at point where change
            occurred.
          </div>
        </div>

        <div className="border">
          <div className="grid grid-cols-3 border-b">
            <div className="p-2 text-center font-semibold border-r">
              Recap Complete at End of day
            </div>
            <div className="p-2 text-center font-semibold border-r">
              70 Hour/ 8 Day drivers
            </div>
            <div className="p-2 text-center font-semibold">60 Hour/ 7 Day Drivers</div>
          </div>

          <div className="grid grid-cols-3">
            <div className="border-r p-1 w-full">
              <div className="text-xs text-center mx-auto w-14">
                On duty hours today, total lines 3 & 4
                <div className="font-semibold">______</div>
              </div>
              
            </div>

            <div className="border-r">
              <div className="grid grid-cols-3 text-center">
                <div className="p-1 border-r">
                  <div className="text-xs">
                    A. Total hours on-duty last 7 days including today
                  </div>
                  <div className="font-semibold">______</div>
                </div>
                <div className="p-1 border-r">
                  <div className="text-xs">
                    B. Total hours available tomorrow. 70hr minus A*
                  </div>
                  <div className="font-semibold">______</div>
                </div>
                <div className="p-1">
                  <div className="text-xs">C. Total hours on duty last 5 days including today:</div>
                  <div className="font-semibold">______</div>
                </div>
              </div>
            </div>

            <div className="border-r">
              <div className="grid grid-cols-3 text-center">
                <div className="p-1 border-r">
                  <div className="text-xs">
                    A. Total hours on-duty last 8 days including today
                  </div>
                  <div className="font-semibold">______</div>
                </div>
                <div className="p-1 border-r">
                  <div className="text-xs">
                    B. Total hours available tomorrow. 80hr minus A*
                  </div>
                  <div className="font-semibold">______</div>
                </div>
                <div className="p-1">
                  <div className="text-xs">C. Total hours on duty last 7 days including today:</div>
                  <div className="font-semibold">______</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center">
          <div className="text-sm mx-auto">*If you took 34 consecutive hours off duty, you have 60/70 hrs available</div>
        </div>
      </div>
    </div>
  );
};

const LogGridRow = ({ label, status, currentLog, calculateHours }) => {
  // Calculate total hours for this status
  const calculateTotalHours = () => {
    if (!currentLog || !currentLog.activities) return 0;

    return currentLog.activities
      .filter((activity) => activity.status === status)
      .reduce((total, activity) => {
        return total + (activity.end_hour - activity.start_hour);
      }, 0);
  };

  // Determine if a specific 15-minute block should be filled
  const isFilled = (hour, quarterHour) => {
    if (!currentLog || !currentLog.activities) return false;

    const timePoint = hour + quarterHour * 0.25;

    return currentLog.activities.some(
      (activity) =>
        activity.status === status &&
        timePoint >= activity.start_hour &&
        timePoint < activity.end_hour
    );
  };

  return (
    <div className="flex border-t">
      <div className="w-28 p-1 border-r flex items-center">
        <div className="text-xs">{label}</div>
      </div>
      <div className="flex-1 grid grid-cols-24 gap-0">
        {Array.from({ length: 24 }).map((_, hour) => (
          <div key={hour} className="h-6 relative">
            {/* Vertical line at start of hour */}
            <div className="absolute left-0 top-0 w-px h-full bg-black"></div>
            <div className="absolute left-1/2 top-0 w-px h-2/3 bg-gray-300"></div>
            <div className="absolute left-1/4 top-0 w-px h-1/3 bg-gray-300"></div>
            <div className="absolute left-3/4 top-0 w-px h-1/3 bg-gray-300"></div>

            {/* The quarter-hour markers */}
            <div className="flex h-full">
              {[0, 1, 2, 3].map((quarter) => (
                <div
                  key={`${hour}-${quarter}`}
                  className="flex-1 flex items-center justify-center"
                >
                  {isFilled(hour, quarter) && (
                    <div className="bg-gray-800 w-full h-1/4"></div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
        {/* Final vertical line at the end */}
        <div className="absolute right-16 top-0 w-px h-full bg-gray-300"></div>
      </div>
      <div className="w-16 p-1 border-l flex items-center justify-center">
        <div className="font-semibold">
          {calculateHours ? calculateTotalHours().toFixed(1) : ""}
        </div>
      </div>
    </div>
  );
};

export default ELDLogs;
