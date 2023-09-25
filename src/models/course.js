import { Schema, model, models } from "mongoose";

const courseSchema = new Schema({
  name: {
    type: String,
    required: true,
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
  letter: {
    type: String,
    required: true,
    enum: ["A", "B"],
  },

  students: {
    type: [Schema.Types.ObjectId],
  },
  tutor: {
    type: Schema.Types.ObjectId,
  },
});

const Course = models.Course || model("Course", courseSchema);

export default Course;
