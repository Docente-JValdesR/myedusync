import { useRouter } from "next/navigation";
function DashboardButton({ name, path, icon }) {
  const router = useRouter();
  return (
    <button
      className="btn btn-light border text-primary m-2 p-3"
      onClick={() => router.push(`dashboard/${path}`)}
    >
      <i className={`${icon} fs-1 `} />
      <hr />
      {name}
    </button>
  );
}

export default DashboardButton;
