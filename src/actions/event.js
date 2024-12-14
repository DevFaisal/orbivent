"use server";
import Event from "@/models/event";
import { Validation } from "@/lib/zod";
import { revalidatePath } from "next/cache";

export async function createEvent(previousState, formData) {
  const result = Validation.createEventSchema.safeParse(
    Object.fromEntries(formData)
  );

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }
  const event = await Event.create(result.data);
  if (!event) {
    return {
      errors: {
        name: "Event not created",
      },
    };
  }
  revalidatePath("/admin");
}

export async function getEvents() {
  try {
    const events = await Event.find({});
    return JSON.stringify(events);
  } catch (error) {
    console.log(error);
  }
}

export async function deleteEvent(id) {
  try {
    const event = await Event.findByIdAndDelete(id);
    if (!event) {
      return {
        errors: {
          name: "Event not found",
        },
      };
    }
    revalidatePath("/admin");
  } catch (error) {
    console.log(error);
  }
}
