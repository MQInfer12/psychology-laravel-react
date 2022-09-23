import React, { useState } from "react";
import styled from "styled-components";
import defaultPhoto from '../../images/defaultPhoto.jpg';
import { ableUser, getUser } from "../../services/usuario";
import UserModal from "./userModal";

const DivCard = styled.div`
  width: 350px;
  border-radius: 20px;
  background-color: ${props => props.estado? "white" : "#ff8080"};
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const PhotoPerfil = styled.img`
  width: 75px;
  height: 75px;
  border-radius: 10px;
`;

const DivCardData = styled.div`
  display: flex;
  gap: 20px;
`;

const DivCardText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const PText = styled.div`
  font-size: 0.8rem;
`;

const DivCardButtons = styled.div`
  display: flex;
  gap: 20px;
`;

const ButtonCard = styled.button`
  width: 100%;
  height: 30px;
  font-size: 0.8rem;
  cursor: pointer;
`;

const UserCard = ({ user }) => {
  const [usuario, setUsuario] = useState(user);
  const [showForm, setShowForm] = useState(false);

  const cambiarHabilitado = async (id) => {
    const res = await ableUser(id);
    const resJson = await res?.json();
    if(resJson.mensaje = 'se actualizo correctamente') {
      const newUser = await getUser(id);
      const newUserJson = await newUser?.json();
      setUsuario(newUserJson);
    }
  } 

  return (
    <DivCard estado={usuario.estado}>
      <DivCardData>
        <PhotoPerfil src={defaultPhoto} />
        <DivCardText>
          <PText>{ usuario.nombre }</PText>
          <PText>Correo: { usuario.email }</PText>
          <PText>Genero: { usuario.genero }</PText>
          <PText>Edad: { usuario.edad }</PText>
          <PText>Rol: { usuario.id_rol == 1? "Beneficiario" : 
                        usuario.id_rol == 2? "Docente" : 
                        usuario.id_rol == 3? "Admin" : ""}</PText>
          <PText>Sede: { usuario.id_sede == 1? "Cochabamba" : 
                        usuario.id_sede == 2? "La Paz" : 
                        usuario.id_sede == 3? "El Alto" : 
                        usuario.id_sede == 4? "Santa Cruz" : ""}</PText>
        </DivCardText>
      </DivCardData>
      <DivCardButtons>
        <ButtonCard disabled={usuario.id_rol == 3} onClick={() => setShowForm(true)}>Editar</ButtonCard>
        <ButtonCard disabled={usuario.id_rol == 3} onClick={() => cambiarHabilitado(usuario.id)}>{usuario.estado? "Deshabilitar" : "Habilitar"}</ButtonCard>
      </DivCardButtons>
      {showForm && 
        <UserModal 
          cerrar={() => setShowForm(false)}
          actualizar={async () => {
            const res = await getUser(usuario.id);
            const resJson = await res?.json();
            setUsuario(resJson);
          }}
          funcion="editar"
          user={usuario}
        />
      }
    </DivCard>
  )
}

export default UserCard;