"use client";
import SchedulesTable from "@/components/schedulesTable";
import { useUser } from "@/context/userContext";
import { useEffect } from "react";

function SchedulesPages() {
  const { schedulesList, courses, schedules, getSchedules, users, days } =
    useUser();
  useEffect(() => {
    getSchedules();
  }, []);
  const schedulesByCourse = (schedules, course) => {
    return schedules.filter((schedule) => schedule.course === course);
  };

  return (
    <div className="container mt-5 pt-5">
      <h1>schedules Page</h1>
      <p>Aqui van todos los horarios de los cursos creados</p>
      {courses &&
        courses?.map((course) => (
          <div key={course._id}>
            <SchedulesTable
              schedulesList={schedulesList}
              name={course.name}
              letter={course.letter}
              id={course._id}
              schedules={schedules && schedulesByCourse(schedules, course._id)}
              users={users}
              days={days}
            />
          </div>
        ))}
    </div>
  );
}

export default SchedulesPages;
