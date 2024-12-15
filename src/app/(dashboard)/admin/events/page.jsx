"use client";

import { deleteEvent, getEvents, updateEventStatus } from "@/actions/event";
import React, { useEffect, useState } from "react";

const EventPage = () => {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const eventData = await getEvents();
        setEvents(JSON.parse(eventData) || []);
      } catch (error) {
        console.error("Failed to fetch events:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchEvents();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-gray-800 text-center">
        Upcoming Events
      </h1>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {events.map((event) => (
            <Event key={event._id} event={event} onDelete={deleteEvent} />
          ))}
        </div>
      )}
    </div>
  );
};

const Event = ({ event, onDelete }) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      setIsDeleting(true);
      try {
        await onDelete(event._id);
      } catch (error) {
        console.error("Failed to delete event:", error);
      } finally {
        setIsDeleting(false);
      }
    }
  };

  const handleUpdateStatus = async (event) => {
    const res = confirm(
      `Are you sure you want to change the status of ${event.name} event to ${
        event.status === "Open" ? "Closed" : "Open"
      }?`
    );

    if (res) {
      const response = await updateEventStatus(event._id);
      console.log(response);
    }
    window.location.reload();
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-4 px-6">
        <h2 className="text-2xl font-bold truncate">{event.name}</h2>
      </div>
      <div className="p-6">
        <p className="text-gray-600 mb-4 line-clamp-3">{event.description}</p>
        <div className="grid grid-cols-2 gap-4 text-sm mb-6">
          <EventDetail
            icon="calendar"
            text={new Date(event.date).toLocaleDateString()}
          />
          <EventDetail icon="clock" text={event.time} />
          <EventDetail
            icon="map-pin"
            text={event.venue}
            className="col-span-2"
          />
        </div>
        <div className="flex justify-between items-center mb-4">
          <EventDetail
            icon="users"
            text={`Limit: ${event.registrationLimit}`}
          />
          <div>
            <ToggleButton
              status={event.status}
              onClick={() => handleUpdateStatus(event)}
            />
          </div>
        </div>

        <button
          onClick={handleDelete}
          disabled={isDeleting}
          className={`w-full py-2 px-4 bg-red-500 text-white rounded hover:bg-red-600 transition-colors ${
            isDeleting ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {isDeleting ? "Deleting..." : "Delete Event"}
        </button>
      </div>
    </div>
  );
};

const EventDetail = ({ icon, text, className = "" }) => (
  <p className={`flex items-center ${className}`}>
    <svg
      className="w-5 h-5 mr-2 text-gray-500"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path d={getIconPath(icon)}></path>
    </svg>
    {text}
  </p>
);

const ToggleButton = ({ status, onClick }) => {
  return (
    <>
      <label className="inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          defaultChecked={status === "Open"}
          value={status}
          className="sr-only peer"
          onClick={onClick}
        />
        <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div>
        <span
          className={`text-sm font-semibold px-3 py-1 rounded-full ${
            status === "Open"
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {status}
        </span>
      </label>
    </>
  );
};

const getIconPath = (icon) => {
  switch (icon) {
    case "calendar":
      return "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z";
    case "clock":
      return "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z";
    case "map-pin":
      return "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z";
    case "users":
      return "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z";
    default:
      return "";
  }
};

export default EventPage;
