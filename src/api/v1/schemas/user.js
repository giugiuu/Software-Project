const { z } = require("zod");
const { UserRoles } = require("../models/user");

const UpdateProfileSchema = z.object({
  name: z.string().optional(),
  email: z.string().email("Invalid email address").optional(),
  password: z.string().optional(),
});

const UpdateUserRoleSchema = z.object({
  role: z.enum(UserRoles),
});

module.exports = {
  UpdateProfileSchema,
  UpdateUserRoleSchema,
};
