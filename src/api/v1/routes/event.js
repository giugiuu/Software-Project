const express = require("express");
const router = express.Router();

const upload = require("../middleware/multer");
const { authenticate, authorize } = require("../middleware/auth");
const sanitizeBody = require("../middleware/sanitize-body");
const sanitizeParams = require("../middleware/sanitize-params");
const sanitizeFiles = require("../middleware/sanitize-files");

const eventController = require("../controllers/event.controller");

const { CreateEventSchema, UpdateEventSchema } = require("../schemas/event");
const { IdParamsSchema, FileSchema } = require("../schemas/common");

router.post(
  "/",
  authenticate,
  authorize(["Organizer"]),
  upload.any("image"),
  sanitizeBody(CreateEventSchema),
  sanitizeFiles(FileSchema),
  eventController.createNewEvent
);

router.get("/", eventController.getEvents);
router.get("/:id", sanitizeParams(IdParamsSchema), eventController.getEvent);

router.put(
  "/:id",
  authenticate,
  authorize(["Organizer", "System Admin"]),
  upload.any("image"),
  sanitizeParams(IdParamsSchema),
  sanitizeBody(UpdateEventSchema),
  sanitizeFiles(FileSchema.optional()),
  eventController.updateEvent
);

router.delete(
  "/:id",
  authenticate,
  authorize(["Organizer", "System Admin"]),
  sanitizeParams(IdParamsSchema),
  eventController.deleteEvent
);

module.exports = router;
