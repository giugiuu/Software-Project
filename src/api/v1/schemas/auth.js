const { z } = require("zod");

const RegistrationSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const LoginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const ForgotPasswodSchema = z.object({
  email: z.string().email("Invalid email address"),
});

module.exports = {
  RegistrationSchema,
  LoginSchema,
  ForgotPasswodSchema,
};
