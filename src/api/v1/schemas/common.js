const { default: mongoose } = require("mongoose");
const { z } = require("zod");

const IdParamsSchema = z.object({
  id: z.string().refine((val) => mongoose.Types.ObjectId.isValid(val), {
    message: "Invalid ID",
  }),
});

const FileSchema = z.object({
  originalname: z.string(),
  mimetype: z.string().refine((val) => ["image/jpeg", "image/png"].includes(val), {
    message: "Unsupported file type",
  }),
  size: z.number().max(5 * 1024 * 1024, "File must be less than 5MB"),
  path: z.string(),
  filename: z.string(),
});

module.exports = { IdParamsSchema, FileSchema };
