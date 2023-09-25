"use client";
import { useUser } from "@/context/userContext";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

function CreateCoursePage() {
  const { handleSubmit, register } = useForm();
  const { data: session } = useSession();
  const { createCourse, coursesList, getCourses, courses } = useUser();
  const router = useRouter();

  const onSubmit = async (data) => {
    console.log(data);
    await createCourse(data, session.id);
  };
  useEffect(() => {
    getCourses();
  }, []);

  return (
    <section className="mt-5 pt-5 container">
      <div className="row">
        <div className="col">
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Letter</th>
                <th scope="col">Edit</th>
              </tr>
            </thead>
            <tbody>
              {courses?.map((course) => (
                <tr key={course._id}>
                  <td>{course.name}</td>
                  <td>{course.letter}</td>
                  <td>
                    <button
                      className="btn btn-light border text-primary"
                      onClick={() =>
                        router.push(`/dashboard/courses/${course._id}`)
                      }
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="col">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group">
              <label className="form-label">Name</label>
              <select
                className="form-select"
                name="name"
                placeholder="NB1"
                {...register("name")}
              >
                {coursesList.map((course) => (
                  <option key={course.value} value={course.value}>
                    {course.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Letter</label>
              <select
                className="form-select"
                name="letter"
                placeholder="A"
                {...register("letter", { required: true })}
              >
                <option value="A">A</option>
                <option value="B">B</option>
              </select>
            </div>
            <button type="submit" className="btn btn-light border text-primary">
              Create Course
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default CreateCoursePage;
