"use client";
import { getEnrolledEvents } from "@/actions/event";
import EventCard from "@/components/EventCard";
import { useAuth } from "@/context/AuthContext";
import React, { useEffect, useState } from "react";

const RegisterEvent = () => {
  const [enrolledEvents, setEnrolledEvents] = useState([]);
  const { user } = useAuth();
  const userId = user?._id;

  useEffect(() => {
    const fetchEnrolledEvents = async () => {
      const result = await getEnrolledEvents({ userId });
      setEnrolledEvents(JSON.parse(result));
    };
    fetchEnrolledEvents();
  }, []);
console.log(enrolledEvents)
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-10">
      {enrolledEvents.length == 0 ? (
        <div className="flex justify-center items-center h-96 w-screen">
          <p className="text-gray-500 text-2xl">No events found</p>
        </div>
      ) : (
        enrolledEvents.map((event, idx) => (
          <EventCard key={idx} event={event} />
        ))
      )}
    </div>
  );
};

export default RegisterEvent;
