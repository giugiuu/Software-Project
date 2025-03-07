const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema(
  {
    image: { type: String, required: true },
    ticketPrice: { type: Number, required: true },
    totalTickets: { type: Number, required: true },
    remainingTickets: { type: Number, required: true },
    organizer: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: Date, required: true },
    location: { type: String, required: true },
    category: { type: String, required: true },
  },
  { timestamps: true }
);

const Event = mongoose.model("Event", EventSchema);

module.exports = Event;
