import React, { useEffect, useState } from "react";
import { getProfessor } from "../../services/usuario";
import { addProfessorToTest } from "../../services/test";
const ModalAssignProfessor = ({ id, actualizar }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleGetData = async () => {
    const res = await getProfessor();
    setData(res);
    setLoading(false);
  };

  useEffect(() => {
    handleGetData();
  }, []);

  const [checSelected, setChecSelected] = useState([]);
  const [btnActive, setBtnActive] = useState(false);

  const handleChangeCheck = (e) => {
    var aux = null;
    if (checSelected.includes(e.target.value)) {
      //If the value is there we remove it.
      aux = checSelected.filter((ele) => ele !== e.target.value);
    } else {
      aux = checSelected.concat(e.target.value);
    }
    setChecSelected(aux);
    if (aux.length > 0) {
      setBtnActive(true);
    } else {
      setBtnActive(false);
    }
  };
  const saveData = async () => {
    const vecAux = [];
    for (let val of checSelected) {
      const value = parseInt(val);
      vecAux.push(value);
    }
    const obj = Object.assign({}, vecAux);
    const resp = await addProfessorToTest(obj, id);
    if(resp.mensaje === "se guardo correctamente"){
        alert('se guardo correctamente')
        actualizar();
    };
  };
  return (
    <div>
      {loading ? (
        <p>cargando</p>
      ) : (
        <>
          <table>
            <thead>
              <tr>
                <th>Email</th>
                <th>User</th>
                <th>Estado</th>
                <th>Sede</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {data.map((v, i) => (
                <tr key={i}>
                  <td>{v.email}</td>
                  <td>{v.nombre_user}</td>
                  <td>{v.estado ? "En funciones" : "En descanso"}</td>
                  <td>{v.nombre_sede}</td>
                  <td>
                    <input
                      type="checkbox"
                      value={v.id}
                      onChange={handleChangeCheck}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button disabled={!btnActive ? true : false} onClick={saveData}>
            Guardar
          </button>
        </>
      )}
    </div>
  );
};

export default ModalAssignProfessor;