import { Schema, model, models } from "mongoose";

const scheduleSchema = new Schema({
  course: {
    type: Schema.Types.ObjectId,
    ref: "Course",
    required: true,
  },
  teacher: {
    id: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    subject: {
      type: String,
      required: true,
    },
  },
  day: {
    type: String,
    required: true,
    enum: ["lunes", "martes", "miercoles", "jueves", "viernes"],
  },
  hour: {
    type: String,
    required: true,
    enum: [
      "8:00 - 8:45",
      "8:45 - 9:30",
      "9:45 - 10:30",
      "10:30 - 11:15",
      "11:30 - 12:15",
      "12:15 - 13:00",
      "13:45 - 14:30",
      "14:30 - 15:15",
      "15:30 - 16:15",
      "16:15 - 17:00",
    ],
  },
});

const Schedule = models.Schedule || model("Schedule", scheduleSchema);

export default Schedule;
