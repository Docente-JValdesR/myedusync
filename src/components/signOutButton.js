"use client";

import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function SignOutButton() {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
      return null;
    }
  }, [status]);

  return (
    <button onClick={() => signOut()} className="btn btn-primary">
      SignOut
    </button>
  );
}
