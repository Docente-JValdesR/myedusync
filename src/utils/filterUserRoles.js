import User from "@/models/user";
import { NextResponse } from "next/server";

export const filterUserRoles = (rolesToFilter) => {
  return async (req, next) => {
    try {
      const users = await User.find({});
      const filteredUsers = users.filter(
        (user) => !rolesToFilter.includes(user.role)
      );

      // Almacenar los usuarios filtrados en el objeto req para usarlos más tarde
      req.filteredUsers = filteredUsers;

      // Continuar con el siguiente middleware o la función de ruta
      next();
    } catch (error) {
      return NextResponse.json(
        { message: "Something went wrong" },
        { status: 400 }
      );
    }
  };
};
