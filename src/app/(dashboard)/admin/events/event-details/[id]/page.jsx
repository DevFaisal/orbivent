"use client";

import {
  deleteEventRegistration,
  getEventDetailsForAdmin,
} from "@/actions/event";
import React, { use, useEffect, useState } from "react";
import moment from "moment";
import { stringify } from "csv-stringify/sync";

const EventDetails = ({ params }) => {
  const { id } = use(params);
  const [event, setEvent] = useState(null);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchEvent = async () => {
      const res = await getEventDetailsForAdmin(id);
      if (res.errors) {
        alert(res.errors?.name || "An error occurred");
        return;
      }
      const { event, users } = await JSON.parse(res);

      setEvent(event || {});
      setUsers(users || []);
    };
    fetchEvent();
  }, [id]);

  const exportUsers = () => {
    const csvData = stringify(
      users.map((user) => ({
        Name: user.name,
        Email: user.email,
      })),
      { header: true }
    );

    const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute("download", `event_${id}_users.csv`);
      link.style.visibility = "hidden";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const deleteUser = async (userId) => {
    const res = await deleteEventRegistration(userId, id);
    if (res.errors) {
      alert(res.errors?.name || "An error occurred");
      return;
    }
    window.location.reload();
  };

  if (!event) {
    return <div className="text-center p-8">Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden mb-8">
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6">
          <h1 className="text-3xl font-bold text-white">{event.name}</h1>
        </div>
        <div className="p-6">
          <p className="text-gray-600 mb-4">{event.description}</p>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="font-semibold">Date:</span>{" "}
              {moment(event.date).format("MMMM D, YYYY")}
            </div>
            <div>
              <span className="font-semibold">Time:</span> {event.time}
            </div>
            <div>
              <span className="font-semibold">Venue:</span> {event.venue}
            </div>
            <div>
              <span className="font-semibold">Registration Limit:</span>{" "}
              {event.registrationLimit}
            </div>
            <div>
              <span className="font-semibold">Participants Count:</span>{" "}
              {event.participantsCount}
            </div>
            <div>
              <span className="font-semibold">Status:</span>{" "}
              <span
                className={`px-2 py-1 rounded ${
                  event.status === "Open"
                    ? "bg-green-200 text-green-800"
                    : "bg-red-200 text-red-800"
                }`}
              >
                {event.status}
              </span>
            </div>
            <div>
              <span className="font-semibold">Created At:</span>{" "}
              {moment(event.createdAt).format("MMMM D, YYYY HH:mm")}
            </div>
            <div>
              <span className="font-semibold">Updated At:</span>{" "}
              {moment(event.updatedAt).format("MMMM D, YYYY HH:mm")}
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Registered Users</h2>
        <button
          onClick={exportUsers}
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
        >
          Export Users
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {users.map((user) => (
          <div key={user._id} className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-2">{user.name}</h3>
            <p className="text-gray-600 mb-2">{user.email}</p>
            <button
              onClick={() => deleteUser(user._id)}
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-2 rounded text-sm"
            >
              Delete User
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventDetails;
