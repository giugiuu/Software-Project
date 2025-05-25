const mongoose = require("mongoose");
const { z } = require("zod");

const CreateBookingSchema = z.object({
  eventId: z.string().refine((val) => mongoose.Types.ObjectId.isValid(val), {
    message: "Invalid event ID",
  }),
  numberOfTickets: z.number().gt(0, "Ticket must be > 0"),
});

module.exports = {
  CreateBookingSchema,
};
