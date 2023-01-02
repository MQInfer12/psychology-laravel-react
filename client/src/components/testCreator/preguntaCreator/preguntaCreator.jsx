import React, { useState } from "react";
import { DangerIconButton, WhiteIconButton } from "../../../styles/globals/formularios";
import { addPregunta, massDestroy } from "../../../services/pregunta";
import ModalPregunta from "./modalPregunta";
import PreguntaCard from "./preguntaCard";
import Pagination from "../pagination";
import SureModal from "../../globals/sureModal";
import { ControlsContainer, TableContainer, TableAnswers, ThNumberal, ThAnswer } from "../../../styles/globals/table";
import { useTableHeight } from "../../../hooks/useTableHeight";
import { useModal } from "../../../hooks/useModal";
import { DeleteContainer, PreguntaCreatorContainer, PSelected } from "../../../styles/pages/testCreator";
import { useTestCreatorContext } from "../../../context/testCreatorContext";

const PreguntaCreator = () => {
  const [preguntasPage, setPreguntasPage] = useState(1);
  const [selecteds, setSelecteds] = useState([]);

  const { tableHeightRef, tableRows, rowHeight } = useTableHeight();

  const { seccion, setSecciones, seccionActual } = useTestCreatorContext();

  const borrarPreguntas = async () => {
    const res = await massDestroy(selecteds);
    if(res.ok) {
      setSecciones(old => {
        return old.map((v, i) => {
          if(i === seccionActual) {
            const newPreguntas = v.preguntas.filter((pregunta) => !selecteds.includes(pregunta.id));
            v.preguntas = newPreguntas;
          }
          return v;
        })
      });
      setSelecteds([]);
      console.log("Se borraron las preguntas");
    }
  }

  const { openModal: openAdd, closeModal: closeAdd } = useModal(
    "Añadir pregunta",
    <ModalPregunta
      call={addPregunta}
      actualizar={(res) => {
        setSecciones(old => {
          return old.map((v, i) => {
            if(i === seccionActual) {
              v.preguntas.push(res.data);
            }
            return v;
          });
        });
        closeAdd();
      }}
      funcion="añadir"
      idSeccion={seccion.id}
    />
  );

  const { openModal: openDelete, closeModal: closeDelete } = useModal(
    "Eliminar preguntas",
    <SureModal
      cerrar={() => closeDelete()}
      sure={borrarPreguntas}
      text={"Se eliminarán " + selecteds.length + " preguntas permanentemente"}
    />
  );

  return (
    <PreguntaCreatorContainer>
      <ControlsContainer spaceBetween>
        <WhiteIconButton title="Añadir pregunta" onClick={openAdd}><i className="fa-solid fa-plus"></i></WhiteIconButton>
        <DeleteContainer>
          <PSelected>{selecteds.length} seleccionadas</PSelected>
          <DangerIconButton 
            title="Eliminar preguntas seleccionadas" 
            disabled={selecteds.length == 0} 
            onClick={openDelete}
          ><i className="fa-solid fa-trash-can"></i></DangerIconButton>
        </DeleteContainer>
      </ControlsContainer>
      <TableContainer hideX ref={tableHeightRef}>
        <TableAnswers>
          <thead>
            <tr>
              <ThNumberal>#</ThNumberal>
              <ThAnswer>PREGUNTA</ThAnswer>
            </tr>
          </thead>
          <tbody>
            {
              seccion.preguntas.filter((v, i) => i >= (preguntasPage - 1) * tableRows && i < preguntasPage * tableRows).map((v, i) => (
                <PreguntaCard key={i} 
                  {...v} 
                  index={((preguntasPage - 1) * tableRows) + (i + 1)}
                  selecteds={selecteds}
                  setSelecteds={setSelecteds}
                  rowHeight={rowHeight}
                />
              ))
            }
          </tbody>
        </TableAnswers>
      </TableContainer>
      <Pagination
        rows={tableRows}
        page={preguntasPage}
        setPage={setPreguntasPage}
      />
    </PreguntaCreatorContainer>
  )
}

export default PreguntaCreator;