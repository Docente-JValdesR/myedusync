import { NextResponse } from "next/server";
import { filterUserRoles } from "@/utils/filterUserRoles";
import { connectDB } from "@/libs/mongodb";
import { checkUserRole } from "@/utils/checkRole";

export async function GET(req, res) {
  // Conectarse a la base de datos
  await connectDB();

  // Aplicar el middleware para verificar el rol
  await checkUserRole(["admin"])(req, () => {});

  // Aplicar el middleware para filtrar múltiples roles
  await filterUserRoles(["superadmin"])(req, () => {});

  // Ahora puedes usar req.filteredUsers
  const users = req.filteredUsers;

  return NextResponse.json(users, { status: 200 });
}
