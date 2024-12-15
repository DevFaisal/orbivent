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
      setEnrolledEvents(JSON.parse(result) || []);
    };
    fetchEnrolledEvents();
  }, [userId]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-10">
      {enrolledEvents.map((event) => (
        <EventCard key={event._id} event={event} />
      ))}
    </div>
  );
};

export default RegisterEvent;
