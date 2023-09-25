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
function Modal({ rowIndex, colIndex }) {
  return (
    <div
      className="modal"
      tabIndex="-1"
      id="exampleModal"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Modal Title</h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
            <div className="modal-body">
              <p>Modal body text goes here.</p>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-primary">
                Save changes
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => console.log(rowIndex, colIndex)}
              >
                ver en consola
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function MatrizComponent() {
  const [matriz, setMatriz] = useState([]);
  const [displayNone, setDisplayNone] = useState([]);
  const [order, setOrder] = useState(fila232);
  const [rowIndex, setRowIndex] = useState(0);
  const [colIndex, setColIndex] = useState(0);

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

  return (
    <div className="container mt-5 pt-5">
      <button
        type="button"
        className="btn btn-light border text-primary mb-3"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Launch demo modal
      </button>
      <Modal rowIndex={rowIndex} colIndex={colIndex} />
      <div className="">
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
                setDisplayNone();
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
              className={`col-1 rounded  m-1  ${
                displayNone?.includes(`${rowIndex}-${colIndex}`)
                  ? "disabled"
                  : "text-light bg-dark text-center btn "
              }`}
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
              onClick={() => {
                setRowIndex(rowIndex);
                setColIndex(colIndex);
              }}
            ></div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default MatrizComponent;
