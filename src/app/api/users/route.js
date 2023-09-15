import { NextResponse } from "next/server";
import { connectDB } from "../../../libs/mongodb";
import User from "../../../models/user";

export async function GET() {
  await connectDB();
  const users = await User.find();
  //quita el usuario con role superadmin
  users.splice(0, 1);

  return NextResponse.json(users, { status: 200 });
}
