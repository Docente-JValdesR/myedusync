"use client";
import { useRouter, usePathname } from "next/navigation";

export default function BackButton() {
  const router = useRouter();
  const pathname = usePathname();

  if (pathname === "/") return null;
  const goBack = () => {
    router.back();
  };
  return (
    <button
      className="btn btn-light text-primary"
      style={{
        position: "fixed",
        bottom: "1rem",
        right: "1rem",
      }}
      onClick={() => goBack()}
    >
      Volver
    </button>
  );
}
