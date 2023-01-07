import React from 'react'
import { useState } from 'react';
import { useTestCreatorContext } from '../../../context/testCreatorContext';
import { ButtonReactivosTr, ResponsiveTr, ThNumber } from '../../../styles/globals/table';
import VoltearPuntuacionesButton from '../buttons/voltearPuntuacionesButton';
import PuntuacionInput from './puntuacionInput';

const ReactivoTableBody = ({ reactivosPage, tableRows, rowHeight, puntuaciones, setPuntuaciones, setSave }) => {
  const { seccion } = useTestCreatorContext();
  const [blink, setBlink] = useState(false);

  return (
    <tbody>
      {
        seccion.preguntas.filter((v, i) => i >= (reactivosPage - 1) * tableRows && i < reactivosPage * tableRows).map((v, i) => (
          <ResponsiveTr rowHeight={rowHeight} key={i}>
            <ThNumber>
              {((reactivosPage - 1) * tableRows) + (i + 1)}
              <ButtonReactivosTr className="buttons">
                <VoltearPuntuacionesButton id={v.id} setBlink={setBlink} setPuntuaciones={setPuntuaciones} />
              </ButtonReactivosTr>
            </ThNumber>
            {
              puntuaciones.filter(va => va.id_pregunta == v.id).map((va, j) => (
                <td key={j}>
                  {/* FIXME: TODOS LOS INPUTS BLINKEAN */}
                  <PuntuacionInput 
                    id={va.id}
                    value={va.asignado}
                    blink={blink}
                    puntuaciones={puntuaciones}
                    setPuntuaciones={setPuntuaciones}
                    setSave={setSave}
                  />
                </td>
              )) 
            }
          </ResponsiveTr>
        ))
      }
    </tbody>
  )
}

export default ReactivoTableBody