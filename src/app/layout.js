"use client";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Providers from "./Providers";
import BackButton from "@/components/backButton";
import Navbar from "@/components/navbar";

export const metadata = {
  title: "MyEduSync",
  description: "app para gestionar el orden de alumnos en clases",
  keywords: "clases, orden, alumnos, educacion, escuela, colegio, profesor",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-primary vh-100">
        <Providers>
          <Navbar />
          {children}
          <BackButton />
        </Providers>
      </body>
    </html>
  );
}
