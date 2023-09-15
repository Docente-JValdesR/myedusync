"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function Register() {
  const [error, setError] = useState(null);

  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const dataResponse = await response.json();
      console.log(dataResponse);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="container min-vh-100">
      <form onSubmit={handleSubmit(onSubmit)}>
        {error && (
          <div className="alert alert-danger mt-3" role="alert">
            {error}
          </div>
        )}
        <h1>Register</h1>

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
          <label htmlFor="email">Email address</label>
          <input
            {...register("email", {
              required: "This field is required",
              pattern: {
                value: /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/,
                message: "Please fill a valid email address",
              },
            })}
            type="email"
            className="form-control"
            name="email"
            placeholder="Enter email"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="form-control"
            name="password"
            placeholder="Password"
            {...register("password", {
              required: "This field is required",
              minLength: {
                value: 6,
                message: "Password must have at least 6 characters",
              },
            })}
          />
        </div>
        <div className="form-group">
          <label className="form-label">Role</label>
          <select
            className="form-control"
            name="role"
            {...register("role", { required: true })}
          >
            <option value="docente">Docente</option>
            <option value="inspector">Inspector</option>
            <option value="directivo">Directivo</option>
            <option value="tutor">Tutor</option>
            <option value="alumno">Alumno</option>
            <option value="admin">Administrador</option>

            <option value="superadmin">Super Administrador</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}
