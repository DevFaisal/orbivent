"use server";
import Event from "@/models/event";
import User from "@/models/user";
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
export async function getNumberOfEvents() {
  try {
    const events = await Event.find({});
    return events.length;
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
  if (event.participants.length >= event.registrationLimit) {
    return {
      errors: {
        name: "Event full",
      },
    };
  }
  Promise.all([
    Event.updateOne(
      { _id: eventId },
      {
        $push: {
          participants: userId,
        },
        $inc: {
          participantsCount: 1,
        },
      }
    ),
    EventRegistration.create({ event: eventId, user: userId }),
  ]);
  return {
    success: true,
  };
}
export async function getEnrolledEvents({ userId }) {
  try {
    const registration = await EventRegistration.find({ user: userId });
    if (registration.length === 0) {
      return {
        errors: {
          name: "No registration found",
        },
      };
    }
    const events = await Promise.all(
      registration
        .map(async (reg) => {
          return await Event.findById(reg.event);
        })
        .filter((event) => event !== null)
    );
    if (events.length === 0) {
      return {
        errors: {
          name: "No events found",
        },
      };
    }
    return JSON.stringify(events);
  } catch (error) {
    console.log(error);
  }
}
export async function getEventDetailsForAdmin(id) {
  try {
    const event = await Event.findById(id);
    if (!event) {
      return {
        errors: {
          name: "Event not found",
        },
      };
    }
    const registration = await EventRegistration.find({ event: id });
    const users = await Promise.all(
      registration.map(async (reg) => {
        return await User.findById(reg.user);
      })
    );
    return JSON.stringify({ event, users });
  } catch (error) {}
}
export async function deleteEventRegistration(userId, eventId) {
  try {
    const res = await Promise.all([
      Event.findByIdAndUpdate(eventId, {
        $pull: { participants: userId },
        $inc: { participantsCount: -1 },
      }),
      EventRegistration.deleteOne({
        event: eventId,
        user: userId,
      }),
    ]);
    if (!res) {
      return {
        errors: {
          name: "Event registration not found",
        },
      };
    }
    return {
      success: true,
    };
  } catch (error) {}
}
