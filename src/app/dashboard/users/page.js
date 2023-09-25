"use client";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useUser } from "@/context/userContext";
import EditButton from "@/components/editButton";

function CreateUserPage() {
  const { register, handleSubmit } = useForm();
  const [labels, setLabels] = useState([]);
  const { createUser, rolesList, getUsers, users, session } = useUser();
  const role = session?.user?.role;

  useEffect(() => {
    // Encuentra el rol del usuario en la matriz de roles
    const roleObject = rolesList.find((i) => i.value === role);
    // Actualiza las etiquetas de estado
    if (roleObject) {
      setLabels(roleObject.labels);
    }
  }, [session]);

  useEffect(() => {
    if (session?.user?.role) {
      getUsers(role);
    }
  }, [role]);

  const onSubmit = (data) => {
    try {
      createUser(data, role);
    } catch {
      throw new Error("No se ha podido crear el usuario");
    }
  };

  return (
    <section className="container mt-5 pt-5">
      <div className="row">
        <div className="col">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Nombre</th>
                <th scope="col">Email</th>
                <th scope="col">Rol</th>
                <th scope="col">Editar</th>
              </tr>
            </thead>
            <tbody>
              {users?.map((user, index) => (
                <tr key={index}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>
                    <EditButton
                      icon={"bi bi-pencil-square"}
                      color={"black"}
                      path={`users/${user._id}`}
                      size={"4"}
                    />
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
              <input
                type="text"
                className="form-control"
                name="name"
                placeholder="Enter name"
                {...register("name", { required: true, minLength: 3 })}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                name="email"
                placeholder="Enter email"
                {...register("email", { required: true })}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                name="password"
                placeholder="Enter password"
                {...register("password", { required: true })}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Roles</label>
              <select
                className="form-select"
                {...register("role", { required: true })}
              >
                {labels.map((label) => (
                  <option key={label} value={label}>
                    {label}
                  </option>
                ))}
              </select>
            </div>
            <button type="submit" className="btn btn-light border text-primary">
              crear Usuario
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default CreateUserPage;
