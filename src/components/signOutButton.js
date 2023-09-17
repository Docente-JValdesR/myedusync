"use client";

import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function SignOutButton() {
  const { status } = useSession();
  const router = useRouter();
  if (status === "unauthenticated") router.push("/login");
  return (
    <button onClick={() => signOut()} className="btn btn-primary">
      SignOut
    </button>
  );
}
