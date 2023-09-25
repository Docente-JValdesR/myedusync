"use client";
import { useEffect } from "react";
import { useUser } from "@/context/userContext";
import { useSession } from "next-auth/react";

function EditCoursePage({ params }) {
  const { course, getCourse } = useUser();

  useEffect(() => {
    getCourse(params.id);
  }, [params.id]);

  return (
    <div className="mt-5 pt-5 container">
      Edit User Page
      <pre>{JSON.stringify(course, null, 2)}</pre>
    </div>
  );
}

export default EditCoursePage;
