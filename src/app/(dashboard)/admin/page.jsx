"use client";

import Events from "@/components/Events";
import { createEvent } from "@/server/event";
import { useForm } from "react-hook-form";
import { useState } from "react";
import InputField from "@/components/InputField";

const AdminPage = () => {
  const { register, handleSubmit, reset } = useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      const res = await createEvent(data);
      setSubmitMessage("Event created successfully!");
      reset();
    } catch (error) {
      console.error("Error creating event:", error);
      setSubmitMessage("Error creating event. Please try again.");
    }
    setIsSubmitting(false);
  };

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">
        Event Management Dashboard
      </h1>
      <div className="grid lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-6 text-gray-700">
            Create New Event
          </h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <InputField
              name="Event Name"
              id="name"
              type="text"
              register={register("name", { required: true })}
              required
              placeholder="Enter event name"
            />
            <InputField
              name="Description"
              id="description"
              type="text"
              register={register("description", { required: true })}
              required
              placeholder="Enter event description"
            />
            <div className="grid grid-cols-2 gap-4">
              <InputField
                name="Date"
                id="date"
                type="date"
                register={register("date", { required: true })}
                required
              />
              <InputField
                name="Time"
                id="time"
                type="time"
                register={register("time", { required: true })}
                required
              />
            </div>
            <div>
              {" "}
              <InputField
                name="Venue"
                id="venue"
                type="text"
                register={register("venue", { required: true })}
                required
                placeholder="Enter event venue"
              />
            </div>
            <div>
              <InputField
                name="Registration Limit"
                id="registrationLimit"
                type="number"
                register={register("registrationLimit", { required: true })}
                required
                min={1}
                placeholder="Enter registration limit"
              />
            </div>
            <div className="flex items-center justify-between pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Creating..." : "Create Event"}
              </button>
              {submitMessage && (
                <p
                  className={`text-sm ${
                    submitMessage.includes("Error")
                      ? "text-red-600"
                      : "text-green-600"
                  }`}
                >
                  {submitMessage}
                </p>
              )}
            </div>
          </form>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-6 text-gray-700">
            Upcoming Events
          </h2>
          <div className="overflow-y-auto max-h-[600px] pr-2">
            <Events />
          </div>
        </div>
      </div>
    </main>
  );
};

export default AdminPage;
