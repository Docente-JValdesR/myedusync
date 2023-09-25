import { connectDB } from "@/libs/mongodb";
import { NextResponse } from "next/server";
import Course from "@/models/course";

export async function GET(req, { params }) {
  await connectDB();
  const courseFound = await Course.findOne({ _id: params.id });
  if (!courseFound)
    return NextResponse.json("course not found", { status: 404 });
  return NextResponse.json(courseFound, { status: 200 });
}
