"use client";
import { useUser } from "@/context/userContext";
import DashboardButton from "@/components/dashboardButton";
import { useEffect } from "react";

function DashboardPage() {
  const { users, courses, session, getUsers, getCourses } = useUser();
  useEffect(() => {
    getUsers(session?.user.role);
    getCourses();
  }, []);
  return (
    <div className="container mt-5 pt-5 text-white">
      <div className="row">
        <div className="col-md-5">
          <h1>Dashboard</h1>
          <h2>{session?.user.name}</h2>
          <h3>{session?.user.role}</h3>
          <hr />
          <h3>
            Usuarios creados{" "}
            {
              users?.filter(
                (user) => user.role !== "superadmin" && user.role !== "admin"
              ).length
            }
          </h3>
          <h3>
            Alumnos - {users?.filter((user) => user.role === "alumno").length}
          </h3>
          <h3>
            Profesores -{" "}
            {users?.filter((user) => user.role === "docente").length}
          </h3>
          <h3>
            Directivos -{" "}
            {users?.filter((user) => user.role === "directivo").length}
          </h3>
          <hr />
          <h3>Cursos creados {courses?.length}</h3>
          <h3>
            Basica -
            {
              courses?.filter((course) => course.name.substring(0, 2) === "NB")
                .length
            }
          </h3>
          <h3>
            Media -{" "}
            {
              courses?.filter((course) => course.name.substring(0, 2) === "NM")
                .length
            }
          </h3>
        </div>
        <div className="col-md-5">
          <DashboardButton
            name={"Usuarios"}
            path={"users"}
            icon={"bi bi-person-plus"}
          />
          <DashboardButton
            name={"Cursos"}
            path={"courses"}
            icon={"bi bi-journal-check"}
          />
          <DashboardButton
            name={"Horarios"}
            path={"schedules"}
            icon={"bi bi-calendar-check"}
          />
          <DashboardButton
            name={"Orden de cursos"}
            path={"orders"}
            icon={"bi bi-border-style"}
          />
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;
