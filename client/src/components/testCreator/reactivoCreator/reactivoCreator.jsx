import React, { useState } from "react";
import styled from "styled-components";
import { WhiteIconButton } from "../../../styles/formularios";
import Cargando from "../../globals/cargando";
import { getReactivosBySeccion } from "../../../services/reactivo";
import { getPuntuacionesByReactivos } from "../../../services/puntuacion";
import Modal from "../../globals/modal";
import Pagination from "../pagination";
import ModalReactivo from "./modalReactivo";
import ReactivoCard from "./reactivoCard";

const PreguntaCreatorContainer = styled.div`
  width: 622px;
  box-shadow: 0px 8px 34px rgba(0, 0, 0, 0.1);
  background-color: #EBF0FA;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
`;

const ControlsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 68px;
  padding: 0px 11px;
`;

//TABLA
const TableContainer = styled.div`
  height: 552px;
`;

const TablePreguntas = styled.table`
  border-collapse: collapse;
  width: 100%;

  & > thead {
    height: 40px;
    width: 100%;
  }

  & > thead > tr > th {
    display: flex;
    align-items: center;
    height: 40px;
  }

  & > tbody > tr {
    max-width: 622px;
    height: 64px;
    background-color: #FFFFFF;
    position: relative;
  }

  & > tbody > tr:nth-child(2n) {
    background-color: #EBF0FA;
  }
`;

const TrHead = styled.tr`
  text-align: center;
  display: grid;
  grid-template-columns: 47px repeat(${props => props.cant}, 1fr);
  align-items: center;
  width: 622px;
  height: 40px;
`;

const ThNumberal = styled.th`
  font-size: 11px;
  color: #171C26;
  padding-left: 11px;
  width: 47px;
  text-align: start;
  font-weight: 600;
`;

const TrCargando = styled.tr`
  display: flex;
  width: 622px;
  height: 512px;
`;

const TdCargando = styled.td`
  background-color: #FFFFFF;
  display: flex;
  width: 100%;
  height: 512px;
`;

const TdPuntuacion = styled.td`
  max-width: 575px;
  color: #464F60;
  font-weight: 400;
  font-size: 14px;
  text-align: center;
`;

const InputNumber = styled.input`
  border: none;
  background-color: transparent;
  text-align: center;
  width: 100%;
  outline: none;
`;

const ReactivoCreator = ({ idSeccion }) => {
  const [reactivos, setReactivos] = useState([]);
  const [idPreguntas, setIdPreguntas] = useState([]);
  const [puntuaciones, setPuntuaciones] = useState([]);

  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [reactivosPage, setReactivosPage] = useState(1);

  const llenarReactivos = async () => {
    const res = await getReactivosBySeccion(idSeccion);
    const resJson = await res?.json();
    setReactivos(resJson);

    //BUSCAR PUNTUACIONES POR ID REACTIVOS
    let idReactivos = [];
    resJson.forEach(reactivo => {
      idReactivos.push(reactivo.id);
    });

    const resPunt = await getPuntuacionesByReactivos(idReactivos);
    const resPuntJson = await resPunt?.json();
    setPuntuaciones(resPuntJson);

    //LLENAR LOS IDPREGUNTAS
    const ids = [];
    resPuntJson.forEach(puntuacion => {
      if(!ids.includes(puntuacion.id_pregunta)) {
        ids.push(puntuacion.id_pregunta);
      }
    })
    setIdPreguntas(ids);

    //DEJAR DE CARGAR
    setLoading(false);
  }

  useState(() => {
    llenarReactivos();
  }, []);

  return (
    <PreguntaCreatorContainer>
      <ControlsContainer>
        <WhiteIconButton onClick={() => setShowForm(true)}><i className="fa-solid fa-plus"></i></WhiteIconButton>
        {
          showForm &&
          <Modal titulo="Añadir reactivo" cerrar={() => setShowForm(false)}>
            <ModalReactivo
              actualizar={() => {
                llenarReactivos();
                setShowForm(false);
              }}
              funcion="añadir"
              idSeccion={idSeccion}
            />
          </Modal>
        }
      </ControlsContainer>
      <TableContainer>
        <TablePreguntas>
          <thead>
            <TrHead cant={reactivos.length}>
              <ThNumberal>#</ThNumberal>
              {
                reactivos.filter((v, i) => i >= (reactivosPage - 1) * 8 && i < reactivosPage * 8).map((v, i) => (
                  <ReactivoCard 
                    key={i} 
                    {...v} 
                    index={((reactivosPage - 1) * 8) + (i + 1)} 
                    llenarReactivos={llenarReactivos}
                  />
                ))
              }
            </TrHead>
          </thead>
          <tbody>
            {
              loading? (
                <TrCargando>
                  <TdCargando>
                    <Cargando />
                  </TdCargando>
                </TrCargando>
              ) : (
                idPreguntas.filter((v, i) => i >= (reactivosPage - 1) * 8 && i < reactivosPage * 8).map((v, i) => (
                  <TrHead cant={reactivos.length} key={i}>
                    <ThNumberal>{i + 1}</ThNumberal>
                    {
                      puntuaciones.filter(va => va.id_pregunta == v).map((va, j) => (
                        <TdPuntuacion>
                          {va.asignado}
                        </TdPuntuacion>
                      )) 
                    }
                  </TrHead>
                ))
              )
            }
          </tbody>
        </TablePreguntas>
      </TableContainer>
      <Pagination 
        cant={reactivos.length}
        rows={8}
        page={reactivosPage}
        setPage={setReactivosPage}
      />
    </PreguntaCreatorContainer>
  )
}

export default ReactivoCreator;