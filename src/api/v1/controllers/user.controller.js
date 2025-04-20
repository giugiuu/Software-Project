const { Event } = require("../models/event");
const { User, UserRoles } = require("../models/user");
const { Booking } = require("../models/booking");

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Failed to get users" });
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Error fetching user" });
  }
};

const updateUserRole = async (req, res) => {
  try {
    const { role } = req.body;

    const user = await User.findById(req.params.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });

    if (
      user.role === "Standard User" &&
      (role === "Organizer" || role === "System Admin")
    ) {
      const bookedEvents = await Booking.find({
        user: req.params.id,
        status: "confirmed",
      });
      let hasBookedEventsAfterToday = false;
      for (const booking of bookedEvents) {
        hasBookedEventsAfterToday = await Event.exists({
          _id: booking.event,
          date: { $gt: new Date() },
        });

        if (hasBookedEventsAfterToday) break;
      }

      if (hasBookedEventsAfterToday)
        return res.status(403).json({
          message:
            "Can not update role, user has confirmed booked events scheduled after today",
        });
      else {
        const pendingBookings = await Booking.find({
          user: req.params.id,
          status: "pending",
        });

        for (const pendingBooking of pendingBookings) {
          pendingBooking.status = "canceled";
          await Event.updateOne(
            { _id: pendingBooking.event },
            { $inc: { remainingTickets: pendingBooking.numberOfTickets } }
          );
          await pendingBooking.save();
        }
      }
    }

    if (
      user.role === "Organizer" &&
      (role === "Standard User" || role === "System Admin")
    ) {
      const hasHostedEvents = await Event.exists({
        organizer: req.params.id,
        date: { $gt: new Date() },
        status: "approved",
      });

      if (hasHostedEvents)
        return res.status(403).json({
          message:
            "Can not update role, user has approved hosted events scheduled after today",
        });
      // reject all other pending events
      else await Event.updateMany({ status: "pending" }, { status: "declined" });
    }

    user.role = role;
    await user.save();

    res.json({ message: "User role updated", user });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error updating user role" });
  }
};

const deleteUser = async (req, res) => {
  try {
    const deleted = await User.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "User not found" });
    res.json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting user" });
  }
};

const getMyProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

const updateMyProfile = async (req, res) => {
  try {
    const userId = req.user.userId;
    const validate = req.body;

    const user = await User.findByIdAndUpdate(
      userId,
      { ...validate, profile_picture: req?.file?.path },
      { new: true }
    );

    res.json({ message: "Profile updated", user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Profile update failed" });
  }
};

const getMyEventOrganizerEvents = async (req, res) => {
  try {
    const events = await Event.find({ organizer: req.user.userId });
    res.json(events);
  } catch (error) {
    res.status(500).json({ error: "Failed to get events" });
  }
};

const getMyEventOrganizerEventsAnalytics = async (req, res) => {
  try {
    const events = await Event.find({ organizer: req.user.userId });

    const analytics = events.map((event) => {
      const booked = event.totalTickets - event.remainingTickets;
      const percentage = (booked / event.totalTickets) * 100;

      return {
        title: event.title,
        percentageBooked: +percentage.toFixed(2),
      };
    });

    res.status(200).json(analytics);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error fetching events analytics" });
  }
};

module.exports = {
  getMyProfile,
  updateMyProfile,
  getAllUsers,
  getUserById,
  updateUserRole,
  deleteUser,
  getMyEventOrganizerEvents,
  getMyEventOrganizerEventsAnalytics,
};
