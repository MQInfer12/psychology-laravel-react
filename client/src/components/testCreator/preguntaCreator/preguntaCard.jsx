import React, { useState, useEffect } from "react";
import { WhiteIconButton } from "../../../styles/globals/formularios";
import { updatePregunta } from "../../../services/pregunta";
import ModalPregunta from "./modalPregunta";
import { 
  ResponsiveTr, ThNumber, DivDouble, PLight
} from "../../../styles/globals/table";
import { useModal } from "../../../hooks/useModal";
import { DivButtonsTd } from "../../../styles/pages/testCreator";
import { useTestCreatorContext } from "../../../context/testCreatorContext";

const PreguntaCard = (props) => {
  const [selected, setSelected] = useState(false);
  const { setSecciones, seccionActual } = useTestCreatorContext();

  useEffect(() => {
    props.selecteds.includes(props.id)? setSelected(true) : setSelected(false);
  });

  const {openModal, closeModal} = useModal(
    "Editar pregunta",
    <ModalPregunta 
      call={updatePregunta}
      actualizar={(res) => {
        setSecciones(old => {
          return old.map((v, i) => {
            if(i === seccionActual) {
              const newPreguntas = v.preguntas.map((pregunta) => {
                if(pregunta.id === props.id) {
                  return res.data;
                }
                return pregunta;
              })
              v.preguntas = newPreguntas;
            }
            return v;
          })
        });
        closeModal();
      }}
      funcion="editar"
      pregunta={props}
      idSeccion={props.id_seccion}
    />
  )

  return (
    <ResponsiveTr 
      inTestCreator
      selectedPregunta={selected}
      rowHeight={props.rowHeight}
    >
      <ThNumber>{props.index}</ThNumber>
      <td>
        <DivDouble>
          <PLight>{props.descripcion}</PLight>
        </DivDouble>
        <DivButtonsTd>
          <WhiteIconButton title="Editar pregunta" onClick={openModal}><i className="fa-solid fa-pencil"></i></WhiteIconButton>
          <WhiteIconButton 
            title="Seleccionar pregunta"
            onClick={() => {
              if(!props.selecteds.includes(props.id)) {
                props.setSelecteds(old => [...old, props.id]);
                setSelected(true);
              } else {
                props.setSelecteds(old => old.filter(value => value != props.id));
                setSelected(false);
              }
            }}
          >
            {
              selected? (
                <i className="fa-solid fa-square-check"></i>
              ) : (
                <i className="fa-regular fa-square-check"></i>
              )
            }
          </WhiteIconButton>
        </DivButtonsTd>
      </td>
    </ResponsiveTr>
  )
}

export default PreguntaCard;