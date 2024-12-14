"use client";

import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import { getEvent } from "@/actions/event";
import { format } from "date-fns";
import Image from "next/image";
import { Calendar, Clock, MapPin, Users } from "lucide-react";

const EventRegistration = ({ params }) => {
  const eventId = use(params).id;
  const [event, setEvent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchEventDetail = async () => {
      try {
        const eventData = await getEvent(eventId);
        setEvent(JSON.parse(eventData));
      } catch (err) {
        setError("Failed to load event details. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchEventDetail();
  }, [eventId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Here you would typically make an API call to register the user
      await new Promise((resolve) => setTimeout(resolve, 1000));
      router.push(`/registration-confirmation/${eventId}`);
    } catch (err) {
      setError("Failed to register. Please try again.");
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md">
          <p className="text-xl font-semibold text-red-600">{error}</p>
          <button
            onClick={() => router.push("/")}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300"
          >
            Return to Home
          </button>
        </div>
      </div>
    );
  }
  const IMAGE_URL =
    "https://images.unsplash.com/photo-1528605248644-14dd04022da1?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <div className="bg-blue-600 text-white py-6">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold">{event.name}</h1>
        </div>
      </div>
      <div className="flex-grow container mx-auto px-4 py-8 flex flex-col md:flex-row gap-8">
        <div className="md:w-2/3">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <Image
              src={IMAGE_URL}
              alt="Event banner"
              width={800}
              height={300}
              className="w-full h-64 object-cover"
            />
            <div className="p-6">
              <h2 className="text-2xl font-semibold mb-4">Event Details</h2>
              <p className="text-gray-600 mb-4">{event.description}</p>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center">
                  <Calendar className="mr-2 text-blue-500" />
                  <span>{format(new Date(event.date), "MMMM d, yyyy")}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="mr-2 text-blue-500" />
                  <span>{event.time}</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="mr-2 text-blue-500" />
                  <span>{event.venue}</span>
                </div>
                <div className="flex items-center">
                  <Users className="mr-2 text-blue-500" />
                  <span>
                    {event.registrationLimit - event.participantsCount} spots
                    left
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="md:w-1/3">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold mb-4">Registration</h2>
            {event.status === "Open" &&
            event.registrationLimit > event.participantsCount ? (
              <form onSubmit={handleSubmit}>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full bg-blue-500 text-white p-3 rounded-lg font-semibold
                    ${
                      isSubmitting
                        ? "opacity-50 cursor-not-allowed"
                        : "hover:bg-blue-600"
                    }
                    transition duration-300 ease-in-out`}
                >
                  {isSubmitting ? "Registering..." : "Register for Event"}
                </button>
              </form>
            ) : (
              <p className="text-center text-red-600 font-semibold">
                {event.status === "Closed"
                  ? "Registration Closed"
                  : "Event Full"}
              </p>
            )}
            <p className="mt-4 text-sm text-gray-600">
              By registering, you agree to our{" "}
              <a href="#" className="text-blue-500 hover:underline">
                Terms and Conditions
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventRegistration;
