"use client";
import { useSession } from "next-auth/react";

function DashboardPage() {
  const { data: session } = useSession();

  return (
    <div className="container mt-5 pt-5 text-white">
      <div className="row">
        <div className="col-12 bg-black">
          <h1>Dashboard</h1>
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;
