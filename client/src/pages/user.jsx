import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { getUsers } from "../services/usuario";
import Cargando from "../components/globals/cargando";
import UserResponse from "../components/user/filter/userReponse";
import UserFilter from "../components/user/filter/userFilter";
import Modal from "../components/globals/modal";
import ModalUser from "../components/user/modalUser";

const DivUsersPage = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
  width: 100%;
`;

const DivUsersContainer = styled.div`
  width: 100%;
  border-radius: 20px;
  padding: 40px;
  background-color: #f4bbff;
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
  justify-content: space-around;
  position: relative;
`;

const ButtonCard = styled.button`
  width: 200px;
  height: 30px;
  font-size: 0.8rem;
  cursor: pointer;
`;

const User = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [showForm, setShowForm] = useState(false);

  const llenarUsuarios = async () => {
    const res = await getUsers();
    const resJson = await res?.json();
    setUsuarios(resJson);
    setLoadingUsers(false);
  };

  useEffect(() => {
    //LLENADO DE USUARIOS
    llenarUsuarios();
  }, []);

  /* ====== FILTER ====== */

  const [filter, setFilter] = useState("");
  const [optionFilter, setOptionFilter] = useState("email");
  
  const handleChange = () => {
    llenarUsuarios();
  };

  const handleSaveInput = (value) => {
    setFilter(value);
  };

  const handleOptionSelect = (option) => {
    setOptionFilter(option);
  };

  return (
    <DivUsersPage>

      {/* FILTRAR */}
      
      <UserFilter
        handleSaveInput={handleSaveInput}
        handleOptionSelect={handleOptionSelect}
      />

      <ButtonCard onClick={() => setShowForm(true)}>Añadir</ButtonCard>
      {showForm && 
        <Modal cerrar={() => setShowForm(false)} titulo="Añadir usuario">
          <ModalUser
            actualizar={() =>{
              llenarUsuarios();
              setShowForm(false);
            }}
            funcion="añadir"
          />
        </Modal>
      }

      {/* ==== LISTADO ===== */}
      <DivUsersContainer>
        {loadingUsers ? (
          <Cargando />
        ) : (
          <UserResponse
            usuarios={usuarios}
            filter={filter}
            optionFilter={optionFilter}
            handleChange={handleChange}
          />
        )}
      </DivUsersContainer>
    </DivUsersPage>
  );
};

export default User;
