"use server";

import User from "@/models/user";
import dbConnect from "@/lib/mongodb";
import Event from "@/models/event";
import { revalidatePath } from "next/cache";

export async function createEvent(data) {
  try {
    const event = await Event.create({
      name: data.name,
      description: data.description,
      date: data.date,
      time: data.time,
      venue: data.venue,
      registrationLimit: data.registrationLimit,
    });
    console.log(event);
  } catch (error) {
    console.log(error);
  }
}

export async function getEvents() {
  try {
    const events = await Event.find({});
    return JSON.stringify(events);
  } catch (error) {
    console.log(error);
  }
}
