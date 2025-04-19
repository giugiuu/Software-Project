const express = require("express");
const router = express.Router();

const authRoutes = require("./auth");
const userRoutes = require("./user");
const eventRoutes = require("./event");
const bookingRoutes = require("./booking");

router.use("/", authRoutes);
router.use("/users", userRoutes);
router.use("/events", eventRoutes);
router.use("/bookings", bookingRoutes);

module.exports = router;
