"use client";
import { useEffect } from "react";
import { useUser } from "@/context/userContext";
import { useSession } from "next-auth/react";

function EditUserPage({ params }) {
  const { data: session } = useSession();
  const { user, getUser } = useUser();
  const role = session?.user?.role;
  useEffect(() => {
    if (session?.user?.role) {
      getUser(params.id, role);
      console.log(user);
    }
  }, [params.id, role]);

  return (
    <div className="mt-5 pt-5 container">
      Edit User Page
      <pre>{JSON.stringify(user, null, 2)}</pre>
    </div>
  );
}

export default EditUserPage;
