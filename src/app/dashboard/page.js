"use client";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  console.log(session);
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status]);

  return (
    <div>
      <h1>Dashboard</h1>
      <button onClick={() => signOut()} className="btn btn-primary">
        SignOut
      </button>
    </div>
  );
}

export default DashboardPage;
