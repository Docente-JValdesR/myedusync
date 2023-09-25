import { NextResponse } from "next/server";
import { connectDB } from "@/libs/mongodb";
import { checkUserRole } from "@/utils/checkRole";
import User from "@/models/user";

export async function GET(req, { params }) {
  await connectDB();
  await checkUserRole(["admin"])(req, () => {});
  const userFound = await User.findOne({ _id: params.id });
  if (!userFound) return NextResponse.json("user not found", { status: 404 });
  return NextResponse.json(userFound, { status: 200 });
}

export async function PUT(req, { params }) {
  await connectDB();
  await checkUserRole(["admin"])(req, () => {});
  const userUpdate = await User.findOneAndUpdate({ _id: params.id }, req.body);
  return NextResponse.json(
    { message: "user updated", userUpdate },
    { status: 200 }
  );
}
