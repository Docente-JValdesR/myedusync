"use client";
import { useSession } from "next-auth/react";

function DashboardPage() {
  const { data: session, status } = useSession();

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Session: {JSON.stringify(session)}</p>
      <p>Status: {status}</p>
    </div>
  );
}

export default DashboardPage;
