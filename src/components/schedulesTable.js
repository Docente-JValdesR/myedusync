import { useRouter } from "next/navigation";
import DashboardButton from "./dashboardButton";
import EditButton from "./editButton";

function SchedulesTable({
  schedulesList,
  name,
  letter,
  id,
  schedules,
  users,
  days,
}) {
  const router = useRouter();

  function getTeacherNameById(id) {
    const user = users?.find((user) => user._id === id);
    return user ? user.name : "Desconocido";
  }

  function getTeacherForSchedule(schedules, day, time) {
    const found = schedules?.find((s) => s.day === day && s.hour === time);
    return found
      ? `${getTeacherNameById(found.teacher.id)} (${found.teacher.subject})`
      : "---";
  }

  return (
    <>
      <h1 className="text-light">
        {name + " - " + letter}
        <EditButton
          path={`schedules/${id}`}
          icon={"bi bi-pencil-square"}
          color={"light"}
          size={"1"}
        />
      </h1>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Horario</th>
            {days.map((day, index) => (
              <th key={day} scope="col">
                {day}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {schedulesList.map((schedule) => (
            <tr key={schedule}>
              <th scope="row">{schedule}</th>
              {days.map((day) => (
                <td key={day}>
                  {getTeacherForSchedule(schedules, day, schedule)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default SchedulesTable;
