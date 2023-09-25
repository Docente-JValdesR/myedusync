import { useRouter } from "next/navigation";

function EditButton({ icon, color, path, size }) {
  const router = useRouter();
  return (
    <button
      className={`btn fs-${size} text-${color}`}
      onClick={() => router.push(`/dashboard/${path}`)}
    >
      <i className={`${icon}`}></i>
    </button>
  );
}

export default EditButton;
