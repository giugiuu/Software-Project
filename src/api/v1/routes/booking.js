const express = require("express");
const router = express.Router();

const { authenticate, authorize } = require("../middleware/auth");
const sanitizeBody = require("../middleware/sanitize-body");
const sanitizeParams = require("../middleware/sanitize-params");

const bookingController = require("../controllers/booking.controller");

const { IdParamsSchema } = require("../schemas/common");
const { CreateBookingSchema } = require("../schemas/booking");

router.use(authenticate);

router.get("/", authorize(["Standard User"]), bookingController.getMyBookings);
router.get(
  "/:id",
  authorize(["Standard User"]),
  sanitizeParams(IdParamsSchema),
  bookingController.getBookingById
);

router.post(
  "/",
  authorize(["Standard User"]),
  sanitizeBody(CreateBookingSchema),
  bookingController.bookTickets
);

router.delete(
  "/:id",
  authorize(["Standard User"]),
  sanitizeParams(IdParamsSchema),
  bookingController.cancelBooking
);

module.exports = router;
