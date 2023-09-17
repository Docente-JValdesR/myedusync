"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

export default function Register() {
  const [error, setError] = useState(null);
  const { register, handleSubmit } = useForm();
  const router = useRouter();

  const onSubmit = async (data) => {
    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      console.log(result);
      if (!response.ok) {
        throw new Error(result.error);
      }
      const login = await signIn("credentials", {
        redirect: false,
        email: data.email,
        password: data.password,
      });
      if (login.error) {
        setError(login.error);
        return;
      }
      router.push("/dashboard");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="container d-flex flex-column justify-content-center align-items-center min-vh-100 text-center text-white">
      <h1 className="mb-5">Register with</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        {error && (
          <div className="alert alert-danger mt-3" role="alert">
            {error}
          </div>
        )}

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
          </select>
        </div>
        <button type="submit" className="btn btn-light text-primary mt-5">
          Submit
        </button>
      </form>
    </div>
  );
}
