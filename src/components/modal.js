export default function Modal({
  rowIndex,
  colIndex,
  students,
  onSelectStudent,
}) {
  return (
    <div
      className="modal fade"
      tabIndex="-1"
      id="exampleModal"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="exampleModalLabel">
              Modal Title
            </h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <label className="form-label">Seleccione un alumno</label>
            <select
              className="form-select"
              onChange={(e) =>
                onSelectStudent(rowIndex, colIndex, e.target.value)
              }
            >
              <option value="">Ninguno</option>
              {students.map((student) => (
                <option key={student.id} value={student.id}>
                  {student.firstname}
                </option>
              ))}
            </select>
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
  );
}
