"use client";
import React from "react";
import { Calendar, Bell, User } from "lucide-react";
import Events from "@/components/Events";
import { useAuth } from "@/context/AuthContext";

const UserPage = () => {
  const { user } = useAuth();
  return (
    <div className="max-h-screen min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-12 text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
            Welcome, {user?.name}
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-600 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            Discover and join exciting events tailored just for you.
          </p>
        </header>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="px-6 py-8 sm:p-10 sm:pb-6">
            <h2 className="text-2xl font-semibold text-gray-900 flex items-center">
              <Calendar className="w-6 h-6 mr-2 text-indigo-500" />
              Upcoming Events
            </h2>
          </div>
          <div className="px-6 pt-6 pb-8 sm:px-10 sm:pt-6 sm:pb-8">
            <Events />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserPage;
