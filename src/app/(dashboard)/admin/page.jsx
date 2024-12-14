import React from "react";
import CreateEventForm from "./CreateEventForm";
import { PlusCircle, Calendar } from "lucide-react";
import Link from "next/link";

const AdminPage = () => {
  return (
    <main className="max-h-screen bg-gradient-to-br from-blue-50 to-indigo-100  py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-12 text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
            Event Management Dashboard
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            Create, manage, and oversee all your events from one central
            location.
          </p>
        </header>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2 bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="px-6 py-8 sm:p-10 sm:pb-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-semibold text-gray-900 flex items-center">
                  <PlusCircle className="w-6 h-6 mr-2 text-indigo-500" />
                  Create New Event
                </h2>
                <span className="px-3 py-1 text-sm font-semibold text-indigo-600 bg-indigo-100 rounded-full">
                  Admin
                </span>
              </div>
            </div>
            <div className="px-6 pt-6 pb-8 sm:px-10 sm:pt-6 sm:pb-8">
              <CreateEventForm />
            </div>
          </div>
          <div className="space-y-8">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300">
              <div className="px-6 py-8 sm:p-10">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold text-gray-900 flex items-center">
                    <Calendar className="w-5 h-5 mr-2 text-indigo-500" />
                    Upcoming Events
                  </h3>
                  <span className="text-2xl font-bold text-indigo-600">12</span>
                </div>
                <p className="text-gray-500">
                  View and manage your upcoming events
                </p>
                <Link href={"/admin/events"}>
                  <button className="mt-6 w-full bg-indigo-50 text-indigo-600 py-2 px-4 rounded-lg font-medium hover:bg-indigo-100 transition-colors duration-300">
                    View All Events
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default AdminPage;
