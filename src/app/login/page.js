"use client";

import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Login() {
  const [error, setError] = useState(null);
  const router = useRouter();
  const { register, handleSubmit } = useForm();
  const { status } = useSession();

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/dashboard");
    }
  }, [status]);

  const onSubmit = async (data) => {
    try {
      const res = await signIn("credentials", {
        redirect: false,
        email: data.email,
        password: data.password,
      });
      if (res.error) {
        setError(res.error);
        return;
      }
      router.push("/dashboard");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100 text-center">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group text-white mb-3">
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
          {error && (
            <div className="alert alert-danger mt-3" role="alert">
              {error}
            </div>
          )}
        </div>
        <div className="form-group text-white mb-3">
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
        <button
          type="submit"
          className="btn btn-light border text-primary mt-3"
        >
          Submit
        </button>
      </form>
      <button
        onClick={() => router.push("/register")}
        className="btn btn-light border text-primary mt-3"
      >
        Create Account
      </button>
    </div>
  );
}
