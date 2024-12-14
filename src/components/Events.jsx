"use client";

import { getEvents } from "@/actions/event";
import React, { useState, useEffect } from "react";

const Events = () => {
  // const [events, setEvents] = useState([]);

  // useEffect(() => {
  //   const getAllEvents = async () => {
  //     const res = await getEvents();
  //     // setEvents(JSON.parse(res));
  //   };
  //   getAllEvents();
  // }, []);

  return (
    <div className="space-y-4">
      {/* {JSON.stringify(getEvents())} */}
      {/* {events && events.length > 0 ? (
        events.map((event, idx) => (
          <div
            key={idx}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
          >
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 px-4">
              <h2 className="text-xl font-semibold truncate">{event.name}</h2>
            </div>
            <div className="p-4">
              <p className="text-gray-600 mb-4 line-clamp-2">
                {event.description}
              </p>
              <div className="grid grid-cols-2 gap-2 text-sm mb-4">
                <p className="flex items-center">
                  <svg
                    className="w-4 h-4 mr-2 text-gray-500"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                  </svg>
                  {new Date(event.date).toLocaleDateString()}
                </p>
                <p className="flex items-center">
                  <svg
                    className="w-4 h-4 mr-2 text-gray-500"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  {event.time}
                </p>
                <p className="flex items-center col-span-2">
                  <svg
                    className="w-4 h-4 mr-2 text-gray-500"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                    <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  </svg>
                  {event.venue}
                </p>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-sm flex items-center">
                  <svg
                    className="w-4 h-4 mr-2 text-gray-500"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                  </svg>
                  Limit: {event.registrationLimit}
                </p>
                <span
                  className={`text-sm font-semibold px-3 py-1 rounded-full ${
                    event.status === "Open"
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {event.status}
                </span>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p className="text-center text-gray-500">No events found.</p>
      )} */}
    </div>
  );
};

export default Events;
