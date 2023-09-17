import { Schema, model, models } from "mongoose";

const userSchema = new Schema({
  name: { type: String, required: true, minLength: 3, maxLength: 50 },
  email: {
    type: String,
    unique: true,
    required: [true, "Please enter an email"],
    match: [
      /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/,
      "Please fill a valid email address",
    ],
  },
  password: {
    type: String,
    required: [true, "Please enter a password"],
    select: false,
  },
  role: {
    type: String,
    enum: [
      "docente",
      "inspector",
      "directivo",
      "alumno",
      "admin",
      "superadmin",
    ],
    default: "alumno",
  },
});

const User = models.User || model("User", userSchema);

export default User;
