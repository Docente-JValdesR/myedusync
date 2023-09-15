import { NextResponse } from "next/server";
import { connectDB } from "../../../../libs/mongodb";
import User from "../../../../models/user";
import bcrypt from "bcryptjs";

export async function POST(req) {
  try {
    const { name, email, role, password } = await req.json();
    await connectDB();
    const userFound = await User.findOne({ email });
    if (userFound)
      return NextResponse.json(
        { error: "user already exists" },
        { status: 400 }
      );
    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = new User({ name, email, role, password: hashedPassword });
    await newUser.save();

    return NextResponse.json(
      { message: "User has been create" },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 400 }
    );
  }
}
