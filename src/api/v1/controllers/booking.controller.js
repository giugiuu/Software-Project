const { Booking } = require("../models/booking");
const { Event } = require("../models/event");

const getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user.userId });
    res.status(200).json({ data: bookings });
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

const bookTickets = async (req, res) => {
  const { eventId, numberOfTickets } = req.body;

  try {
    const event = await Event.findById(eventId);
    if (!event) return res.status(404).json({ message: "Event not found" });
    if (event.status !== "approved")
      return res.status(403).json({ message: "Event waiting approval" });

    if (event.remainingTickets < numberOfTickets) {
      return res.status(400).json({ message: "Not enough tickets available" });
    }

    event.remainingTickets -= numberOfTickets;
    await event.save();

    const booking = await Booking.create({
      user: req.user.userId,
      event: eventId,
      numberOfTickets,
      totalPrice: event.ticketPrice * numberOfTickets,
    });

    res.status(201).json({ data: booking });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
};

const getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findOne({
      _id: req.params.id,
      user: req.user.userId,
    }).populate("event");

    if (!booking) return res.status(404).json({ message: "Booking not found" });

    res.status(200).json({ data: booking });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

const cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findOne({
      _id: req.params.id,
      user: req.user.userId,
    });

    if (!booking) return res.status(404).json({ message: "Booking not found" });

    const event = await Event.findById(booking.event);
    if (event) {
      event.remainingTickets += booking.numberOfTickets;
      await event.save();
    }

    booking.status = "canceled";
    await booking.save();

    res.status(200).json({ message: "Booking cancelled" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  getMyBookings,
  getBookingById,
  bookTickets,
  cancelBooking,
};
