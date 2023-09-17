// middleware/checkUserRole.js

import { NextResponse } from "next/server";

export const checkUserRole = (allowedRoles) => {
  return (req, next) => {
    try {
      // Asegurarse de que el usuario está autenticado y tiene un rol
      if (!req.user || !req.user.role) {
        return NextResponse.json(
          { message: "Authentication required" },
          { status: 401 }
        );
      }

      // Verificar si el rol del usuario se encuentra entre los roles permitidos
      if (!allowedRoles.includes(req.user.role)) {
        return NextResponse.json(
          { message: "Insufficient permissions" },
          { status: 403 }
        );
      }

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
