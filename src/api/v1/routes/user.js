const express = require("express");
const router = express.Router();

const upload = require("../middleware/multer");
const { authenticate, authorize } = require("../middleware/auth");
const sanitizeBody = require("../middleware/sanitize-body");
const sanitizeParams = require("../middleware/sanitize-params");
const sanitizeFiles = require("../middleware/sanitize-files");

const userController = require("../controllers/user.controller");

const { UpdateProfileSchema, UpdateUserRoleSchema } = require("../schemas/user");
const { FileSchema, IdParamsSchema } = require("../schemas/common");

router.use(authenticate);

router.get("/profile", userController.getMyProfile);
router.put(
  "/profile",
  upload.any("profile_picture"),
  sanitizeBody(UpdateProfileSchema),
  sanitizeFiles(FileSchema),
  userController.updateMyProfile
);

router.get("/events", authorize(["Organizer"]), userController.getMyEventOrganizerEvents);
router.get(
  "/events/analytics",
  authorize(["Organizer"]),
  userController.getMyEventOrganizerEventsAnalytics
);

router.get("/", authorize(["System Admin"]), userController.getAllUsers);
router.get(
  "/:id",
  authorize(["System Admin"]),
  sanitizeParams(IdParamsSchema),
  userController.getUserById
);
router.put(
  "/:id",
  authorize(["System Admin"]),
  sanitizeParams(IdParamsSchema),
  sanitizeBody(UpdateUserRoleSchema),
  userController.updateUserRole
);
router.delete(
  "/:id",
  authorize(["System Admin"]),
  sanitizeParams(IdParamsSchema),
  userController.deleteUser
);

module.exports = router;
