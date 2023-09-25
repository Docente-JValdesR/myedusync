import { NextResponse } from "next/server";
import { filterUserRoles } from "@/utils/filterUserRoles";
import { checkUserRole } from "@/utils/checkRole";
import { connectDB } from "@/libs/mongodb";
import User from "@/models/user";
import bcrypt from "bcryptjs";

export async function GET(req) {
  // Conectarse a la base de datos
  await connectDB();
  // Aplicar el middleware para verificar el rol
  await checkUserRole(["admin"])(req, () => {});
  // Aplicar el middleware para filtrar múltiples roles
  await filterUserRoles(["superadmin"])(req, () => {});
  const users = req.filteredUsers;

  return NextResponse.json(users, { status: 200 });
}

export async function POST(req) {
  await connectDB();
  await checkUserRole(["admin"])(req, () => {});
  try {
    const { name, email, password, role } = await req.json();
    if (role == "superadmin")
      return NextResponse.json(
        { error: `no puedes crear un usuario del tipo ${role}` },
        { status: 400 }
      );
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
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 400 }
    );
  }
}
