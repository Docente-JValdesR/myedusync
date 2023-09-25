import Course from "@/models/course";
import { connectDB } from "@/libs/mongodb";
import { NextResponse } from "next/server";

export async function GET() {
  await connectDB();
  try {
    const courses = await Course.find({});
    return NextResponse.json(courses, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 400 }
    );
  }
}

export async function POST(req) {
  await connectDB();
  try {
    const { name, letter } = await req.json();
    const courseFound = await Course.findOne({ name });

    if (courseFound && courseFound.letter === letter) {
      return NextResponse.json(
        { error: "Course already exists" },
        { status: 400 }
      );
    }

    const newCourse = new Course({ name, letter });
    await newCourse.save();
    return NextResponse.json(
      { message: "Course has been create" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 400 }
    );
  }
}
