import mongoose from "mongoose";

const EventSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    venue: {
      type: String,
      required: true,
    },
    registrationLimit: {
      type: Number,
      required: true,
      min: [1, "Registration limit must be greater than 0"],
    },
    participantsCount: {
      type: Number,
      default: 0,
    },
    participants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    status: {
      type: String,
      enum: ["Open", "Closed", "Completed"],
      default: "Open",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Event || mongoose.model("Event", EventSchema);
