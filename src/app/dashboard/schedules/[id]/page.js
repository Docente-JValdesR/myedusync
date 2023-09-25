"use client";
import SchedulesTable from "@/components/schedulesTable";
import { useUser } from "@/context/userContext";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

function SchedulePage({ params }) {
  const { register, handleSubmit } = useForm();
  const {
    schedulesList,
    course,
    getCourse,
    users,
    createSchedule,
    getSchedule,
    schedule,
    days,
    subjects,
  } = useUser();
  useEffect(() => {
    getCourse(params.id);
  }, [params.id]);
  useEffect(() => {
    getSchedule(params.id);
  }, [params.id]);
  const onSubmit = async (data) => {
    console.log(data);
    const newData = {
      course: params.id,
      teacher: {
        id: data.teacher,
        subject: data.subject,
      },
      day: data.day,
      hour: data.schedule,
    };
    const res = await createSchedule(newData);
    console.log(res);
  };
  console.log(schedule);
  return (
    <div className="container mt-5 pt-5">
      <h1>schedules Update</h1>
      <p>Agregar Horarios</p>
      <div className="row">
        <div className="col">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Horario
              </label>
              <select
                className="form-select"
                placeholder="Horario"
                aria-label="Default select example"
                {...register("schedule")}
              >
                {schedulesList.map((schedule, index) => (
                  <option key={index} value={schedule}>
                    {schedule}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-3">
              <label className="form-label">Dia</label>
              <select
                className="form-select"
                placeholder="Dia"
                aria-label="Default select example"
                {...register("day")}
              >
                {days.map((day, index) => (
                  <option key={index} value={day}>
                    {day}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="letter" className="form-label">
                Docente
              </label>
              <select
                className="form-select"
                placeholder="Docente"
                aria-label="Default select example"
                {...register("teacher")}
              >
                {users &&
                  users
                    .filter((user) => user.role === "docente")
                    .map((user, index) => (
                      <option key={index} value={user._id}>
                        {user.name}
                      </option>
                    ))}
              </select>
            </div>
            <div className="mb-3">
              <label className="form-label">Asignatura</label>
              <select
                className="form-select"
                placeholder="Asignatura"
                aria-label="Default select example"
                {...register("subject")}
              >
                {subjects.map((subject, index) => (
                  <option key={index} value={subject}>
                    {subject}
                  </option>
                ))}
              </select>
            </div>
            <button type="submit" className="btn btn-primary">
              Agregar
            </button>
          </form>
        </div>
        <div className="col">
          {course && (
            <SchedulesTable
              schedulesList={schedulesList}
              name={course.name}
              letter={course.letter}
              id={course._id}
              schedules={schedule}
              users={users}
              days={days}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default SchedulePage;
