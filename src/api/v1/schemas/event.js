const { z } = require("zod");
const { EventStatus } = require("../models/event");

const CreateEventSchema = z.object({
  ticketPrice: z
    .string()
    .refine((val) => Number(val) > 0, "Ticket Price must be > 0")
    .transform(Number),
  totalTickets: z
    .string()
    .refine((val) => Number(val) > 0, "Total Tickets must be > 0")
    .transform(Number),
  title: z.string().min(1, "Title is too short"),
  description: z.string().min(1, "Description is too short"),
  date: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Invalid date string",
  }),
  location: z.string().min(1, "Location is too short"),
  category: z.string().min(1, "Category is too short"),
});

const UpdateEventSchema = z.object({
  ticketPrice: z
    .string()
    .refine((val) => val != undefined || Number(val) > 0, "Ticket Price must be > 0")
    .transform(Number)
    .optional(),
  totalTickets: z
    .string()
    .refine((val) => val != undefined || Number(val) > 0, "Total Tickets must be > 0")
    .transform(Number)
    .optional(),
  title: z.string().optional(),
  description: z.string().min(10, "Description is too short").optional(),
  date: z.coerce.date({ message: "Invalid date" }).optional(),
  location: z.string().min(3, "Location is too short").optional(),
  category: z.string().min(3, "Category is too short").optional(),
  status: z.enum(EventStatus).optional(),
});

module.exports = { CreateEventSchema, UpdateEventSchema };
