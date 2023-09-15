import "bootstrap/dist/css/bootstrap.css";
import Providers from "./Providers";
import dynamic from "next/dynamic";
import BackButton from "@/components/backButton";

const DynamicBootstrap = dynamic(
  () => require("bootstrap/dist/js/bootstrap.min.js"),
  { ssr: false }
);

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
          {children}
          <BackButton />
        </Providers>
      </body>
    </html>
  );
}
