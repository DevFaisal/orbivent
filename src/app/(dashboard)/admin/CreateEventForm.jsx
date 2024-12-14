"use client";
import React, { useActionState } from "react";
import InputField from "@/components/InputField";
import { useFormStatus } from "react-dom";
import { createEvent } from "@/actions/event";
import SubmitButton from "@/components/SubmitButton";

const CreateEventForm = () => {
  const CreateEventInputs = [
    {
      label: "Event Name",
      name: "name",
      id: "name",
      type: "text",
      placeholder: "Enter event name",
    },
    {
      label: "Description",
      name: "description",
      id: "description",
      type: "text",
      placeholder: "Enter event description",
    },
    {
      label: "Date",
      name: "date",
      id: "date",
      type: "date",
    },
    {
      label: "Time",
      name: "time",
      id: "time",
      type: "time",
    },
    {
      label: "Venue",
      name: "venue",
      id: "venue",
      type: "text",
      placeholder: "Enter event venue",
    },
    {
      label: "Registration Limit",
      name: "registrationLimit",
      id: "registrationLimit",
      type: "number",
      min: 1,
      placeholder: "Enter registration limit",
    },
  ];
  const [state, createEventAction] = useActionState(createEvent, undefined);

  return (
    <form className="mt-8 space-y-6" action={createEventAction}>
      <div className="space-y-4">
        {CreateEventInputs.map((input) => (
          <InputField
            key={input.id}
            name={input.name}
            id={input.id}
            type={input.type}
            required
            placeholder={input.placeholder}
            error={state?.errors?.[input.id]}
          />
        ))}
      </div>
      <div>
        <SubmitButton>Create Event</SubmitButton>
      </div>
    </form>
  );
};

export default CreateEventForm;
