import React from 'react'
import { useTestCreatorContext } from '../../../context/testCreatorContext';
import { useModal } from '../../../hooks/useModal';
import { addSeccion, deleteSeccion } from '../../../services/seccion';
import { DangerButton, WhiteButton, WhiteIconButton } from '../../../styles/globals/formularios'
import { ButtonContainer, DashPart, DashTitle } from '../../../styles/pages/testCreator'
import SureModal from '../../globals/sureModal';

const SeccionOptions = ({ test, loading, setLoading }) => {
  const { seccion, seccionActual, setSeccionActual, setSecciones, option, setOption } = useTestCreatorContext();

  const añadirSeccion = async () => {
    setLoading(true);
    const res = await addSeccion(test.id);
    if(res.ok) {
      const resJson = await res?.json();
      setSecciones(old => {
        return [...old, resJson.data];
      })
      console.log("Se creó una nueva sección");
      setLoading(false);
    }
  }

  const eliminarSeccion = async () => {
    const res = await deleteSeccion(seccion.id);
    if(res.ok) {
      setSecciones(old => {
        return old.filter((v, i) => v.id !== seccion.id);
      })
      console.log("Se eliminó la sección");
    }
  }

  const { openModal, closeModal } = useModal(
    "Eliminar sección",
    <SureModal
      cerrar={() => closeModal()}
      sure={eliminarSeccion}
      text="Se eliminará esta sección permanentemente"
    />
  );

  return (
    <DashPart>
      <DashTitle>Sección {seccion ? seccionActual + 1 : "nueva"}</DashTitle>
      <ButtonContainer>
        <WhiteIconButton disabled={seccionActual === 0} onClick={() => setSeccionActual(oldSeccionActual => oldSeccionActual - 1)}>
          <i className="fa-solid fa-angle-left"></i>
        </WhiteIconButton>
        {
          seccion ?
          <DangerButton onClick={openModal}>Eliminar Sección</DangerButton>
          :
          <WhiteButton onClick={añadirSeccion} disabled={loading}>Crear Sección</WhiteButton>
        }
        <WhiteIconButton disabled={!seccion} onClick={() => setSeccionActual(oldSeccionActual => oldSeccionActual + 1)}>
          <i className="fa-solid fa-angle-right"></i>
        </WhiteIconButton>
      </ButtonContainer>
      <ButtonContainer>
        {
          seccion &&
            <WhiteIconButton title="Mostrar opciones de sección" active={option === 0} onClick={() => setOption(0)}>
              <i className="fa-solid fa-gear"></i>
            </WhiteIconButton>
        }
        <WhiteIconButton title="Mostrar índice" active={option === 1} onClick={() => setOption(1)}>
          <i className="fa-solid fa-indent"></i>
        </WhiteIconButton>
      </ButtonContainer>
    </DashPart>
  )
}

export default SeccionOptions