"use client";
import { getEvents } from "@/actions/event";
import React, { useState, useEffect, useMemo } from "react";
import {

  Search,
  Filter,
  X,
} from "lucide-react";
import Link from "next/link";
import EventCard from "./EventCard";
import moment from "moment";

const Events = () => {
  const [events, setEvents] = useState([]);
  const [search, setSearch] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [sortBy, setSortBy] = useState("date");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getAllEvents = async () => {
      try {
        setIsLoading(true);
        const res = await getEvents();
        setEvents(JSON.parse(res));
      } catch (err) {
        setError("Failed to fetch events. Please try again later.");
        console.error("Error fetching events:", err);
      } finally {
        setIsLoading(false);
      }
    };
    getAllEvents();
  }, []);

  const filteredAndSortedEvents = useMemo(() => {
    return events
      .filter((event) => {
        const searchLower = search.toLowerCase();
        const matchesSearch =
          event.name.toLowerCase().includes(searchLower) ||
          event.description.toLowerCase().includes(searchLower) ||
          event.venue.toLowerCase().includes(searchLower);
        const matchesDate =
          !dateFilter || new Date(event.date) >= new Date(dateFilter);
        const matchesStatus = !statusFilter || event.status === statusFilter;
        return matchesSearch && matchesDate && matchesStatus;
      })
      .sort((a, b) => {
        if (sortBy === "date") {
          return new Date(a.date) - new Date(b.date);
        } else if (sortBy === "name") {
          return a.name.localeCompare(b.name);
        }
        return 0;
      });
  }, [events, search, dateFilter, statusFilter, sortBy]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  return (
    <div className="space-y-6">
      <div className="bg-white p-4 rounded-lg shadow-md">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search events..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={18}
            />
          </div>
          <input
            type="date"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Statuses</option>
            <option value="Open">Open</option>
            <option value="Closed">Closed</option>
          </select>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="date">Sort by Date</option>
            <option value="name">Sort by Name</option>
          </select>
        </div>
        {(search || dateFilter || statusFilter) && (
          <div className="mt-4 flex items-center flex-wrap">
            <Filter size={18} className="text-gray-400 mr-2" />
            <span className="text-sm text-gray-600 mr-2">Active filters:</span>
            {search && (
              <FilterTag
                label={`Search: ${search}`}
                onClear={() => setSearch("")}
              />
            )}
            {dateFilter && (
              <FilterTag
                label={`Date: ${moment(dateFilter).format("MMM D, YYYY")}`}
                onClear={() => setDateFilter("")}
              />
            )}
            {statusFilter && (
              <FilterTag
                label={`Status: ${statusFilter}`}
                onClear={() => setStatusFilter("")}
              />
            )}
          </div>
        )}
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredAndSortedEvents.length > 0 ? (
          filteredAndSortedEvents.map((event) => (
            <Link key={event._id} href={`/user/register-event/${event._id}`}>
              <EventCard key={event._id} event={event} />
            </Link>
          ))
        ) : (
          <p className="text-center text-gray-500 py-8 col-span-full">
            No events found.
          </p>
        )}
      </div>
    </div>
  );
};


const FilterTag = ({ label, onClear }) => (
  <span className="inline-flex items-center bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full">
    {label}
    <button
      onClick={onClear}
      className="ml-1 text-blue-500 hover:text-blue-700 focus:outline-none"
    >
      <X size={14} />
    </button>
  </span>
);

const LoadingSpinner = () => (
  <div className="flex justify-center items-center py-12">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
  </div>
);

const ErrorMessage = ({ message }) => (
  <div className="text-center py-12">
    <p className="text-red-500 font-semibold">{message}</p>
  </div>
);

export default Events;
