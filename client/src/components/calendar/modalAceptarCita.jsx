import React from 'react';
import useGet from '../../hooks/useGet';
import { acceptAppointment } from '../../services/cita';
import { WhiteButton } from '../../styles/globals/formularios';
import { DivContainer, DivUser } from '../../styles/pages/calendar';
import Cargando from '../globals/cargando';

const ModalAceptarCita = ({horario, actualizar}) => {
  const { resJson: citas, loading } = useGet(`cita/horario/${horario.id_horario}`, { alwaysLoading: true });

  const AceptarCita = async (id) => {
    const res = await acceptAppointment(horario.id_horario, id);
    if(res.ok) {
      actualizar();
    }
  }

  return (
    <DivContainer>
      {
        loading ? (
          <Cargando />
        ) : (
          citas.map((v, i) => (
            <DivUser key={i}>
              {v.nombre}
              <WhiteButton onClick={() => AceptarCita(v.id)}>Aceptar</WhiteButton>
            </DivUser>
          ))
        )
      }
    </DivContainer>
  )
}

export default ModalAceptarCita;