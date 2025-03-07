const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      required: true,
      type: String,
      minlength: 7,
    },
    profile_picture: {
      type: Buffer,
      required: true,
    },
    role: {
      type: String,
      required: true,
      enum: ["Standard User", "Organizer", "System Admin"],
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (this.user.isModified("password")) {
    this.user.password = await bcrypt.hash(this.user.password, 8);

    next();
  }
});

const User = mongoose.model("User", userSchema);

module.exports = User;
