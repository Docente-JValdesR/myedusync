"use client";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.min.css";
import Providers from "./Providers";
import { useEffect } from "react";
import { UserProvider } from "@/context/userContext";
import BackButton from "@/components/backButton";

//export const metadata = {
//  title: "MyEduSync",
//  description: "app para gestionar el orden de alumnos en clases",
//  keywords: "clases, orden, alumnos, educacion, escuela, colegio, profesor",
//};

export default function RootLayout({ children }) {
  useEffect(() => {
    if (typeof window !== "undefined") {
      require("bootstrap/dist/js/bootstrap.min.js");
    }
  }, []);
  return (
    <html lang="en">
      <body className="bg-primary min-vh-100">
        <Providers>
          <UserProvider>{children}</UserProvider>
          <BackButton />
        </Providers>
      </body>
    </html>
  );
}
