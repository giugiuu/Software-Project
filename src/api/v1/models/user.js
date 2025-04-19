const mongoose = require("mongoose");

const passwordUtils = require("../utils/password");

const UserRoles = ["Standard User", "Organizer", "System Admin"];

//schema
const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: {
      type: String,
      unique: true,
      required: true,
      trim: true,
      lowercase: true,
    },
    password: {
      required: true,
      type: String,
      minlength: 7,
      trim: true,
    },
    profile_picture: {
      type: String,
    },
    role: {
      type: String,
      required: true,
      enum: UserRoles,
      default: UserRoles[0],
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (this.isModified("password"))
    this.password = await passwordUtils.hashPassword(this.password);
  next();
});

userSchema.virtual("events", {
  ref: "Event",
  localField: "_id",
  foreignField: "owner",
});

userSchema.virtual("bookings", {
  ref: "Booking",
  localField: "_id",
  foreignField: "user",
});

const User = mongoose.model("User", userSchema);

module.exports = { User, UserRoles };
