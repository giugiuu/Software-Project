const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");

const authController = require("../controllers/auth.controller");
const sanitizeFiles = require("../middleware/sanitize-files");
const sanitizeBody = require("../middleware/sanitize-body");

const { FileSchema } = require("../schemas/common");
const {
  RegistrationSchema,
  LoginSchema,
  ForgotPasswodSchema,
} = require("../schemas/auth");

router.post(
  "/register",
  upload.any("profile_picture"),
  sanitizeBody(RegistrationSchema),
  sanitizeFiles(FileSchema),
  authController.registerUser
);
router.post("/login", sanitizeBody(LoginSchema), authController.loginUser);

router.put(
  "/forgetPassword",
  sanitizeBody(ForgotPasswodSchema),
  authController.forgotPassword
);

module.exports = router;
