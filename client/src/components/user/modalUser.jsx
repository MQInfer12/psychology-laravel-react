import React from "react";
import styled from "styled-components";
import { initialForm, validationsForm } from "../../validations/user";
import { UseForm } from "../../hooks/useForm";
import { FormContainer, PurpleButton, WhiteButton } from "../../styles/formularios";
import ProfilePic from "../globals/profilePic";
import FormInputsText from "../globals/formInputsText";
import FormInputsSelect from "../globals/formInputsSelect";

const ModalUserContainer = styled.div`
  display: flex;
  gap: 16px;
  flex-direction: column;
`;

const Columnas = styled.div`
  display: flex;
  gap: 16px;
`;

const FotoContainer = styled.div`
  display: flex;
  gap: 16px;
  align-items: center;
`;

const ModalUser = ({ call, actualizar, funcion, user }) => {

  const {
    form,
    errors,
    handleChange,
    handleSubmit,
    handleResetImg,
  } = UseForm(
    user? {
      nombre: user.nombre_user,
      email: user.email,
      edad: String(user.edad),
      contrasenia: "password",
      genero: user.genero,
      sede: String(user.id_sede),
      rol: String(user.id_rol),
      perfil: user.perfil
    } : initialForm, 
    validationsForm, 
    call,
    actualizar, 
    user?.id
  );

  let data;
  if(funcion == "añadir") {
    data = [
      {
        name: "nombre",
        value: form.nombre,
        placeholder: "Nombre",
        error: errors.nombre,
        tipo: "text"
      },
      {
        name: "email",
        value: form.email,
        placeholder: "Correo",
        error: errors.email,
        tipo: "text"
      }, 
      {
        name: "contrasenia",
        value: form.contrasenia,
        placeholder: "Contraseña",
        error: errors.contrasenia,
        tipo: "text"
      },
      {
        name: "edad",
        value: form.edad,
        placeholder: "Edad",
        error: errors.edad,
        tipo: "number"
      },
    ];
  } else if(funcion == "editar") {
    data = [
      {
        name: "nombre",
        value: form.nombre,
        placeholder: "Nombre",
        error: errors.nombre,
        tipo: "text"
      },
      {
        name: "edad",
        value: form.edad,
        placeholder: "Edad",
        error: errors.edad,
        tipo: "number"
      },
    ];
  }

  let dataSelect;
  if(funcion == "añadir") {
    dataSelect = [
      {
        select: "genero",
        seleccionado: user?.genero,
        data: [
          {
            nombre: "Elija una opción",
            value: 0,
          },
          {
            nombre: "Hombre",
            value: "hombre",
          },
          {
            nombre: "Mujer",
            value: "mujer",
          }
        ],
        error: errors.genero,
      },
      {
        select: "sede",
        seleccionado: user?.id_sede,
        data: [
          {
            nombre: "Elija una opción",
            value: 0,
          },
          {
            nombre: "Cochabamba",
            value: 1,
          },
          {
            nombre: "La Paz",
            value: 2,
          },
          {
            nombre: "El Alto",
            value: 3,
          },
          ,
          {
            nombre: "Santa Cruz",
            value: 4,
          },
        ],
        error: errors.sede,
      },
      {
        select: "rol",
        seleccionado: user?.id_rol,
        data: [
          {
            nombre: "Elija una opción",
            value: 0,
          },
          {
            nombre: "Beneficiario",
            value: 1,
          },
          {
            nombre: "Docente",
            value: 2,
          },
        ],
        error: errors.rol,
      },
    ];
  } else if(funcion == "editar") {
    dataSelect = [
      {
        select: "genero",
        seleccionado: user?.genero,
        data: [
          {
            nombre: "Elija una opción",
            value: 0,
          },
          {
            nombre: "Hombre",
            value: "hombre",
          },
          {
            nombre: "Mujer",
            value: "mujer",
          }
        ],
        error: errors.genero,
      },
      {
        select: "sede",
        seleccionado: user?.id_sede,
        data: [
          {
            nombre: "Elija una opción",
            value: 0,
          },
          {
            nombre: "Cochabamba",
            value: 1,
          },
          {
            nombre: "La Paz",
            value: 2,
          },
          {
            nombre: "El Alto",
            value: 3,
          },
          ,
          {
            nombre: "Santa Cruz",
            value: 4,
          },
        ],
        error: errors.sede,
      },
    ];
  }

  return (
    <ModalUserContainer>
      {
        funcion == "editar" &&
        <FotoContainer>
          <ProfilePic width="75px" height="75px" src={form.perfil} />
          <WhiteButton onClick={() => handleResetImg('perfil')}>Reset</WhiteButton>
        </FotoContainer>
      }
      <Columnas>
        <FormContainer>
          <FormInputsText
            data={data}
            handleChange={handleChange}
          />
        </FormContainer>
        <FormContainer>
          <FormInputsSelect
            data={dataSelect}
            handleChange={handleChange}
          />
        </FormContainer>
      </Columnas>
      <PurpleButton onClick={handleSubmit}>{funcion}</PurpleButton>
    </ModalUserContainer>
  ) 
}

export default ModalUser;