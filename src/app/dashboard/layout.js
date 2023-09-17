"use client";
import Navbar from "@/components/navbar";
import { useSession } from "next-auth/react";

export default function RootLayout({ children }) {
  const { data: session } = useSession();
  return (
    <section>
      <Navbar user={session?.user} />
      {children}
    </section>
  );
}
