import React from 'react'
import { ControlsContainer } from '../../../styles/globals/table'
import { DeleteContainer, PSelected } from '../../../styles/pages/testCreator'
import AĆ±adirPreguntaButton from '../buttons/aĆ±adirPreguntaButton'
import EliminarPreguntasButton from '../buttons/eliminarPreguntasButton'

const PreguntaControls = ({ selecteds, setSelecteds }) => {
  return (
    <ControlsContainer spaceBetween>
      <AĆ±adirPreguntaButton  />
      <DeleteContainer>
        <PSelected>{selecteds.length} seleccionadas</PSelected>
        {/* FIXME: BOTON AL CAMBIAR DE SECCION CON PREGUNTAS SELECCIONADAS */}
        <EliminarPreguntasButton selecteds={selecteds} setSelecteds={setSelecteds} />
      </DeleteContainer>
    </ControlsContainer>
  )
}

export default PreguntaControls