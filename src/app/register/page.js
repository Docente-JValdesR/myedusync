"use client";
import { useForm } from "react-hook-form";

export default function Register() {
  const { register, handleSubmit, errors } = useForm();
  const onSubmit = async (data) => {
    const response = await fetch("/api/auth/signup", {
      method: "POST",
      body: JSON.stringify(data),
    });
    const result = await response.json();
    console.log(result);
  };

  return (
    <div className="container min-vh-100">
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
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}
