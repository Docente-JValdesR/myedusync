"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100 text-center">
      <div className="row">
        <div className="col">
          <Image
            src="/images/logo.png"
            alt="logo"
            width={2500 / 7}
            height={1000 / 7}
            className="mb-3"
          />
          <button
            onClick={() => router.push("/login")}
            className="btn btn-lg btn-light border text-primary mt-3 ms-md-5"
          >
            Sign In
          </button>
        </div>
      </div>
    </div>
  );
}
