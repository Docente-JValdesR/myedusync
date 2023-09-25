import { NextResponse } from "next/server";
import Schedule from "@/models/schedules";
import { connectDB } from "@/libs/mongodb";

export async function GET() {
  await connectDB();
  try {
    const schedules = await Schedule.find();
    return NextResponse.json(schedules, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 400 }
    );
  }
}

export async function POST(req) {
  await connectDB();
  try {
    const { day, hour, teacher, course } = await req.json();

    const scheduleFound = await Schedule.findOne({ day, hour, course });
    if (scheduleFound) {
      return NextResponse.json(
        { error: "Schedule already exists" },
        { status: 400 }
      );
    }

    const newSchedule = new Schedule({ day, hour, teacher, course });

    await newSchedule.save();
    return NextResponse.json(
      { message: "Schedule has been create" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 400 }
    );
  }
}
