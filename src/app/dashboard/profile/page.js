"use client";
import useExcelToJson from "@/utils/useExcelToJson";
export default function ProfilePage() {
  const [jsonData, handleFileUpload, error] = useExcelToJson();

  return (
    <div className="mt-5 pt-5">
      <input type="file" accept=".xlsx,.xls" onChange={handleFileUpload} />
      {error && <div style={{ color: "red" }}>{error}</div>}
      <pre>{JSON.stringify(jsonData, null, 2)}</pre>
    </div>
  );
}
