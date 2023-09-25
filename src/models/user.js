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
    required: true,
  },
  subrole: {
    type: String,
    enum: [
      "tutor",
      "asignatura",
      "inspector general",
      "director",
      "unidad técnico pedagógica",
    ],
  },
  subject: {
    type: String,
    enum: [
      "edu general básica",
      "matemáticas",
      "lenguaje",
      "ciencias",
      "historia",
      "educación física",
      "educación artística",
      "educación tecnológica",
      "inglés",
    ],
  },
  course: {
    type: String,
    enum: [
      "NB1",
      "NB2",
      "NB3",
      "NB4",
      "NB5",
      "NB6",
      "NB7",
      "NB8",
      "NM1",
      "NM2",
      "NM3",
      "NM4",
      "NM3D",
      "NM4D",
    ],
  },
});

const User = models.User || model("User", userSchema);

export default User;
