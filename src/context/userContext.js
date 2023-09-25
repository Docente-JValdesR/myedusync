"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { useSession } from "next-auth/react";

export const userContext = createContext();

export const useUser = () => {
  const context = useContext(userContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

export const UserProvider = ({ children }) => {
  const [users, setUsers] = useState();
  const [user, setUser] = useState();
  const [courses, setCourses] = useState();
  const [course, setCourse] = useState();
  const [schedule, setSchedule] = useState();
  const [schedules, setSchedules] = useState();
  const { data: session } = useSession();
  // Al cargar la página, obtiene los datos del almacenamiento local
  useEffect(() => {
    const localUsers = localStorage.getItem("users");
    const localUser = localStorage.getItem("user");
    const localCourses = localStorage.getItem("courses");
    const localCourse = localStorage.getItem("course");

    if (localUsers) {
      setUsers(JSON.parse(localUsers));
    }
    if (localUser) {
      setUser(JSON.parse(localUser));
    }
    if (localCourses) {
      setCourses(JSON.parse(localCourses));
    }
    if (localCourse) {
      setCourse(JSON.parse(localCourse));
    }
  }, []);
  // Al modificar "users", actualiza el almacenamiento local
  useEffect(() => {
    if (users) {
      localStorage.setItem("users", JSON.stringify(users));
    }
  }, [users]);
  // Al modificar "user", actualiza el almacenamiento local
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    }
  }, [user]);
  // Al modificar "courses", actualiza el almacenamiento local
  useEffect(() => {
    if (courses) {
      localStorage.setItem("courses", JSON.stringify(courses));
    }
  }, [courses]);
  // Al modificar "course", actualiza el almacenamiento local
  useEffect(() => {
    if (course) {
      localStorage.setItem("course", JSON.stringify(course));
    }
  }, [course]);

  // Peticiones de usuarios
  const getUsers = async (session) => {
    try {
      const response = await fetch(`/api/users/${session}`);
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.log(error);
    }
  };
  const getUser = async (id, session) => {
    try {
      const response = await fetch(`/api/users/${session}/${id}`);
      const data = await response.json();
      setUser(data);
    } catch (error) {
      console.log(error);
    }
  };
  const createUser = async (data, session) => {
    const response = await fetch(`/api/users/${session}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    setUsers([...users, data]);
  };
  // Peticiones de cursos
  const getCourses = async () => {
    try {
      const response = await fetch("/api/courses");
      const data = await response.json();
      setCourses(data);
    } catch (error) {
      console.log(error);
    }
  };
  const getCourse = async (id) => {
    try {
      const response = await fetch(`/api/courses/${id}`);
      const data = await response.json();
      setCourse(data);
    } catch (error) {
      console.log(error);
    }
  };
  const createCourse = async (data) => {
    const res = await fetch("/api/courses", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    setCourses([...courses, data]);
  };

  // Peticiones de horarios
  const getSchedules = async () => {
    try {
      const response = await fetch("/api/schedules");
      const data = await response.json();
      setSchedules(data);
    } catch (error) {
      console.log(error);
    }
  };
  const getSchedule = async (id) => {
    const response = await fetch(`/api/schedules/${id}`);
    const data = await response.json();
    setSchedule(data);
    return data;
  };
  const createSchedule = async (data) => {
    const res = await fetch("/api/schedules", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (schedules) setSchedules([...schedules, data]);
    else setSchedules([data]);
    return res.json();
  };

  // Listas de opciones y datos fijos

  const rolesList = [
    { value: "admin", labels: ["directivo", "docente", "alumno"] },
    {
      value: "superadmin",
      labels: ["directivo", "docente", "alumno", "admin"],
    },
    { value: "directivo", labels: ["docente", "alumno"] },
    { value: "docente", labels: ["alumno"] },
  ];
  const coursesList = [
    { value: "NB1", label: "Primero Básico" },
    { value: "NB2", label: "Segundo Básico" },
    { value: "NB3", label: "Tercero Básico" },
    { value: "NB4", label: "Cuarto Básico" },
    { value: "NB5", label: "Quinto Básico" },
    { value: "NB6", label: "Sexto Básico" },
    { value: "NB7", label: "Séptimo Básico" },
    { value: "NB8", label: "Octavo Básico" },
    { value: "NM1", label: "Primero Medio" },
    { value: "NM2", label: "Segundo Medio" },
    { value: "NM3", label: "Tercero Medio" },
    { value: "NM4", label: "Cuarto Medio" },
  ];
  const schedulesList = [
    "8:00 - 8:45",
    "8:45 - 9:30",
    "9:45 - 10:30",
    "10:30 - 11:15",
    "11:30 - 12:15",
    "12:15 - 13:00",
    "13:45 - 14:30",
    "14:30 - 15:15",
    "15:30 - 16:15",
    "16:15 - 17:00",
  ];
  const days = ["lunes", "martes", "miercoles", "jueves", "viernes"];
  const subjects = [
    "Lenguaje y Comunicación",
    "Matemática",
    "Ciencias Naturales",
    "Historia, Geografía y Ciencias Sociales",
    "Educación Física",
    "Artes Visuales",
    "Música",
    "Tecnología",
    "Inglés",
    "Religión",
    "Filosofía",
    "Educación Ciudadana",
    "Orientación",
  ];
  return (
    <userContext.Provider
      value={{
        user,
        users,
        getUsers,
        getUser,
        createUser,
        course,
        courses,
        getCourses,
        getCourse,
        createCourse,
        schedule,
        schedules,
        getSchedule,
        getSchedules,
        createSchedule,
        coursesList,
        rolesList,
        schedulesList,
        days,
        subjects,
        session,
      }}
    >
      {children}
    </userContext.Provider>
  );
};
