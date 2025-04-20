const { Booking } = require("../models/booking");
const { EventStatus, Event } = require("../models/event");
const { UserRoles } = require("../models/user");

const createNewEvent = async (req, res) => {
  try {
    const data = req.body;

    const event = await Event.create({
      ...data,
      organizer: req.user.userId,
      remainingTickets: data.totalTickets,
      status: EventStatus[0],
      image: req.file.path,
    });

    res.status(201).json(event);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error creating event" });
  }
};

const updateEvent = async (req, res) => {
  try {
    const data = req.body;

    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: "Not found" });

    const isOwner = event.organizer.toString() === req.user.userId;

    if (req.user.role === UserRoles[1] && !isOwner) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    // Only admins can change status
    if (req.user.role !== UserRoles[2] && data.status) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    if (data.totalTickets) {
      const booked = event.totalTickets - event.remainingTickets;

      if (data.totalTickets < booked)
        return res.status(400).json({
          message: `Total tickets must be atleast must be atleast ${booked} or higher`,
        });

      event.remainingTickets = data.totalTickets - booked;
    }

    event.set({ ...data, image: req.file.path });

    await event.save();
    res.json(event);
  } catch (error) {
    res.status(500).json({ message: "Error updating event" });
  }
};

const deleteEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: "Not found" });

    const isOwner = event.organizer.toString() === req.user.userId;

    if (req.user.role === UserRoles[1] && !isOwner) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    await event.deleteOne();
    await Booking.deleteMany({ event: event._id });
    res.status(204).json({ message: "Deleted event" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting event" });
  }
};

const getEvents = async (req, res) => {
  try {
    const events = await Event.find({ status: "approved" });
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: "Error fetching events" });
  }
};

const getEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    if (event.status !== "approved")
      return res.status(403).json("Event awaiting approval");

    res.json(event);
  } catch (error) {
    res.status(500).json({ message: "Error fetching event" });
  }
};

module.exports = {
  createNewEvent,
  updateEvent,
  deleteEvent,
  getEvents,
  getEvent,
};
