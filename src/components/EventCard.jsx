"use client";
import { Calendar, Clock, MapPin, Users } from "lucide-react";
import { format } from "date-fns";

const EventCard = ({ event }) => (
  <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
    <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-4 px-6">
      <h2 className="text-xl font-bold truncate">{event.name}</h2>
    </div>
    <div className="p-6">
      <p className="text-gray-600 mb-4 line-clamp-2">{event.description}</p>
      <div className="grid grid-cols-2 gap-4 text-sm mb-6">
        <EventDetail
          icon={<Calendar className="w-4 h-4" />}
          text={format(new Date(event.date), "MMM d, yyyy")}
        />
        <EventDetail icon={<Clock className="w-4 h-4" />} text={event.time} />
        <EventDetail
          icon={<MapPin className="w-4 h-4" />}
          text={event.venue}
          className="col-span-2"
        />
      </div>
      <div className="flex justify-between items-center">
        <EventDetail
          icon={<Users className="w-4 h-4" />}
          text={`Limit: ${event.registrationLimit}`}
        />
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
);

const EventDetail = ({ icon, text, className = "" }) => (
  <p className={`flex items-center ${className}`}>
    <span className="mr-2 text-gray-500">{icon}</span>
    {text}
  </p>
);

export default EventCard;
