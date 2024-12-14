import mongoose from "mongoose";

const EventRegistrationSchema = mongoose.Schema(
  {
    event: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    registrationDate: {
      type: Date,
      default: Date.now,
    },
    status: {
      type: String,
      enum: ["Registered", "Cancelled", "Attended"],
      default: "Registered",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.EventRegistration ||
  mongoose.model("EventRegistration", EventRegistrationSchema);
