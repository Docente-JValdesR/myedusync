import { NextResponse } from "next/server";
import Schedule from "@/models/schedules";
import { connectDB } from "@/libs/mongodb";

export async function GET(req, { params }) {
  await connectDB();
  const scheduleFound = await Schedule.find({ course: params.id });
  return NextResponse.json(scheduleFound, { status: 200 });
}
