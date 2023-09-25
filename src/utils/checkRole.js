// crea un middleware que pueda verificar la propiedad role de una session creada con next-auth

// Path: src/utils/checkRole.js

import { getToken } from "next-auth/jwt";

const secret = process.env.NEXTAUTH_SECRET;

export function checkUserRole(roles) {
  return async function (req, next) {
    const users = await getToken({ req, secret });
    const { role } = users.user;
    if (roles.includes(role)) {
      return next();
    } else {
      throw new Error("No tienes permisos para acceder a esta ruta");
    }
  };
}
