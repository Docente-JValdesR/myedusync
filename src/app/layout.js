"use client";
import "bootstrap/dist/css/bootstrap.min.css";
import Providers from "./Providers";
import { useEffect } from "react";

export const metadata = {
  title: "MyEduSync",
  description: "app para gestionar el orden de alumnos en clases",
  keywords: "clases, orden, alumnos, educacion, escuela, colegio, profesor",
};

export default function RootLayout({ children }) {
  useEffect(() => {
    if (typeof window !== "undefined") {
      require("bootstrap/dist/js/bootstrap.js");
    }
  }, []);
  return (
    <html lang="en">
      <body className="bg-primary vh-100">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
