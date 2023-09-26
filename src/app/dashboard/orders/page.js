"use client";
import { useState, useEffect } from "react";
import {
  fila232,
  fila222,
  grupo4,
  grupo6,
  circuloU2,
  circulo2,
  bloque3,
  bloque4,
} from "@/json/order";
import Modal from "@/components/modal";

function MatrizComponent() {
  //estado de la matriz que se renderiza
  const [matriz, setMatriz] = useState([]);
  const [rowIndex, setRowIndex] = useState(0);
  const [colIndex, setColIndex] = useState(0);
  //estado de los estudiantes que son asignados a la matriz
  const [selectedStudents, setSelectedStudents] = useState([]);
  //estado que se usa para ocultar los botones de la matriz
  const [displayNone, setDisplayNone] = useState([]);
  //estado que se usa para seleccionar el tipo de grupo
  const [order, setOrder] = useState();
  //estado que se usa para guardar los alumnos de la api
  const [students, setStudents] = useState([]);
  useEffect(() => {
    console.log({
      rowIndex,
      colIndex,
      selectedStudents,
      displayNone,
      order,
      students,
    });
  }, [rowIndex, colIndex, selectedStudents, displayNone, order, students]);
  //crea la matriz de 12x10
  useEffect(() => {
    let tempMatriz = [];
    for (let i = 0; i < 12; i++) {
      tempMatriz[i] = [];
      for (let j = 0; j < 10; j++) {
        tempMatriz[i][j] = `${i}-${j}`;
      }
    }
    setMatriz(tempMatriz);
  }, []);
  //obtiene los alumnos de la api
  useEffect(() => {
    const getStudents = async () => {
      const res = await fetch("https://jsonplaceholder.org/users");
      const data = await res.json();
      setStudents(data);
    };
    getStudents();
  }, []);
  //carga los ordenes en el estado

  //funcion que se ejecuta cuando se selecciona un alumno
  const onSelectStudent = (rowIndex, colIndex, studentId) => {
    let newSelected = [...selectedStudents];
    if (!newSelected[rowIndex]) newSelected[rowIndex] = [];
    newSelected[rowIndex][colIndex] = students.find(
      (student) => student.id === parseInt(studentId)
    );
    setSelectedStudents(newSelected);
  };

  return (
    <div className="container mt-5 pt-5">
      <Modal
        rowIndex={rowIndex}
        colIndex={colIndex}
        students={students}
        onSelectStudent={onSelectStudent}
      />
      <div className="text-light">
        <label className="form-label">selecciona el tipo de grupo</label>
        <select
          className="form-control"
          id="exampleFormControlSelect1"
          onChange={(e) => {
            setOrder(e.target.value);
            switch (e.target.value) {
              case "fila232":
                setDisplayNone(fila232);
                break;
              case "fila222":
                setDisplayNone(fila222);
                break;
              case "grupo4":
                setDisplayNone(grupo4);
                break;
              case "grupo6":
                setDisplayNone(grupo6);
                break;
              case "circuloU2":
                setDisplayNone(circuloU2);
                break;
              case "circulo2":
                setDisplayNone(circulo2);
                break;
              case "bloque3":
                setDisplayNone(bloque3);
                break;
              case "bloque4":
                setDisplayNone(bloque4);
                break;
              default:
                setDisplayNone(order);
                break;
            }
          }}
        >
          <option value="">Selecciona una opcion</option>
          <option value="fila232">Fila 232</option>
          <option value="fila222">Fila 222</option>
          <option value="grupo4">Grupo 4</option>
          <option value="grupo6">Grupo 6</option>
          <option value="circuloU2">Circulo U2</option>
          <option value="circulo2">Circulo 2</option>
          <option value="bloque3">Bloque 3</option>
          <option value="bloque4">Bloque 4</option>
        </select>
      </div>

      {matriz.map((row, rowIndex) => (
        <div key={rowIndex} className="row justify-content-center">
          {row.map((colValue, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              className={`col-1 rounded  m-1 p-3 ${
                displayNone?.includes(`${rowIndex}-${colIndex}`)
                  ? "disabled"
                  : "text-light bg-dark text-center btn "
              }`}
              data-bs-toggle={`${
                displayNone?.includes(`${rowIndex}-${colIndex}`) ? "" : "modal"
              }`}
              data-bs-target="#exampleModal"
              onClick={() => {
                setRowIndex(rowIndex);
                setColIndex(colIndex);
              }}
            >
              {selectedStudents[rowIndex] &&
              selectedStudents[rowIndex][colIndex]
                ? selectedStudents[rowIndex][colIndex].firstname
                : ""}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default MatrizComponent;
