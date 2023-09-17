// useExcelToJson.js
import { useState } from "react";
import * as XLSX from "xlsx/xlsx.mjs";

const useExcelToJson = () => {
  const [jsonData, setJsonData] = useState(null);
  const [error, setError] = useState(null);

  const hasRequiredColumns = (headers) => {
    const requiredColumns = ["name", "email", "role"];
    return requiredColumns.every((col) => headers.includes(col));
  };

  const arrayToObject = (array, headers) => {
    const objArray = [];
    for (let i = 1; i < array.length; i++) {
      let obj = {};
      for (let j = 0; j < array[i].length; j++) {
        obj[headers[j]] = array[i][j];
      }
      objArray.push(obj);
    }
    return objArray;
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];

    const reader = new FileReader();
    reader.onload = (evt) => {
      // Parse data
      const bstr = evt.target.result;
      const wb = XLSX.read(bstr, { type: "binary" });

      // Get first worksheet
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];

      // Convert array of arrays
      const data = XLSX.utils.sheet_to_json(ws, { header: 1 });

      // Check for required columns
      if (data.length > 0) {
        const headers = data[0];
        if (!hasRequiredColumns(headers)) {
          setError(
            "El archivo debe contener columnas con los nombres: 'name', 'email', 'role'."
          );
          return;
        }
      }

      // Convert array of arrays to array of objects
      const objectData = arrayToObject(data, data[0]);

      // Update state
      setJsonData(objectData);
      setError(null);
    };

    reader.readAsBinaryString(file);
  };

  return [jsonData, handleFileUpload, error];
};

export default useExcelToJson;
