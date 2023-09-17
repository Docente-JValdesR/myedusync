import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
import { decode } from "next-auth/jwt";

export const checkUserRole = (allowedRoles) => {
  return async (req, next) => {
    const authHeader = req.headers.get("authorization");

    const sessionToken = authHeader["next-auth.session-token"];

    console.log(sessionToken);

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new Error("Authorization header missing");
    }

    const token = authHeader.split(" ")[1];

    const decodedToken = jwt.decode(token, { complete: true }, { json: true });
    console.log(token);

    if (!decodedToken || !decodedToken.user || !decodedToken.user.role) {
      return NextResponse.json(
        { message: "Authentication required" },
        { status: 401 }
      );
    }

    if (!allowedRoles.includes(decodedToken.user.role)) {
      return NextResponse.json(
        { message: "Insufficient permissions" },
        { status: 403 }
      );
    }

    // Continuar con el siguiente middleware o la función de ruta
    next();
  };
};
