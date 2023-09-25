"use client";
import Navbar from "@/components/navbar";
import { useUser } from "@/context/userContext";

export default function RootLayout({ children }) {
  const { session } = useUser();
  return (
    <section>
      <Navbar session={session} />
      {children}
    </section>
  );
}
