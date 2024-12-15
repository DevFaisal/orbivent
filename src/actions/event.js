"use server";
import Event from "@/models/event";
import { Validation } from "@/lib/zod";
import { revalidatePath } from "next/cache";
import EventRegistration from "@/models/eventRegistration";

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
export async function getEvent(id) {
  try {
    const event = await Event.findById({
      _id: id,
    });
    if (!event) {
      return {
        errors: {
          name: "Event not found",
        },
      };
    }
    return JSON.stringify(event);
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
export async function updateEventStatus(id) {
  const event = await Event.findById(id);
  if (!event) {
    return {
      errors: {
        name: "Event not found",
      },
    };
  }
  event.status = event.status === "Open" ? "Closed" : "Open";
  await event.save();
  revalidatePath("/admin/events");
}
export async function eventRegistration(userId, eventId) {
  const event = await Event.findById(eventId);
  if (!event) {
    return {
      errors: {
        name: "Event not found",
      },
    };
  }
  if (event.participants.includes(userId)) {
    return {
      errors: {
        name: "User already registered",
      },
    };
  }
  if (event.status === "Closed") {
    return {
      errors: {
        name: "Event registration closed",
      },
    };
  }
  if (event.participants.length >= event.maxParticipants) {
    return {
      errors: {
        name: "Event full",
      },
    };
  }
  Promise.all([
    Event.updateOne({ _id: eventId }, { $push: { participants: userId } }),
    EventRegistration.create({ event: eventId, user: userId }),
  ]);
  return {
    success: true,
  };
}
export async function getEnrolledEvents({ userId }) {
  try {
    const registration = await EventRegistration.find({ user: userId });
    const events = await Promise.all(
      registration.map(async (reg) => {
        return await Event.findById(reg.event);
      })
    );
    return JSON.stringify(events);
  } catch (error) {
    console.log(error);
  }
}
