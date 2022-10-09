import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { getSeccionesByTest } from "../services/seccion";
import { getTest } from "../services/test";
import PreguntaCreator from "../components/testCreator/preguntaCreator/preguntaCreator";
import SeccionSidebar from "../components/testCreator/seccionSidebar";
import Cargando from "../components/globals/cargando";
import ReactivoCreator from "../components/testCreator/reactivoCreator/reactivoCreator";

//CONTROLES ARRIBA
const TestCreatorContainer = styled.div`
  height: 100%;
  border-radius: 10px;
  background-color: #FFFFFF;
  display: flex;
  overflow: hidden;
`;

const SeccionContainer = styled.div`
  transform: translateX(${props => props.translate * -100}%);
  min-width: 100%;
  height: 100%;
  display: flex;
  transition: all 1.5s;
`;

const CreatorsContainer = styled.div`
  min-width: calc(100% - 263px);
  display: flex;
  flex-direction: column;
`;

const FullScreen = styled.div`
  width: 100%;
  min-height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  transform: translateY(${props => props.translate * -100}%);
  transition: all 1s;
`;

const EmptySeccion = styled.p`
  width: 400px;
  line-height: 24px;
  font-size: 14px;
  font-weight: 500;
  opacity: 0.6;
  text-align: center;
`;

const TestCreator = () => {
  const { idTest } = useParams();

  const [test, setTest] = useState([]);
  const [secciones, setSecciones] = useState([]);

  const [loading, setLoading] = useState(true);
  const [seccionActual, setSeccionActual] = useState(0);
  const [editActual, setEditActual] = useState(0);
  
  const llenarSecciones = async () => {
    const tst = await getTest(idTest);
    const tstJson = await tst?.json();
    setTest(tstJson);
    const res = await getSeccionesByTest(idTest);
    const resJson = await res?.json();
    setSecciones(resJson);
    setLoading(false);
  }

  useEffect(() => {
    llenarSecciones(idTest);
  }, [])

  return (
    <TestCreatorContainer>
      {
        loading? (
          <Cargando />
        ) : (
          <>
            {
              secciones.map((v, i) => (
                <SeccionContainer key={i} translate={seccionActual}>
                  <SeccionSidebar 
                    test={test[0]}
                    index={i + 1}
                    idTest={idTest} 
                    llenarSecciones={llenarSecciones}
                    seccionState={{seccionActual, setSeccionActual}}
                    editState={{editActual, setEditActual}}
                    seccion={v}
                  />
                  <CreatorsContainer>
                    <FullScreen translate={editActual}>
                      <PreguntaCreator 
                        idSeccion={v.id}
                      />
                    </FullScreen>
                    <FullScreen translate={editActual}>
                      <ReactivoCreator
                        idSeccion={v.id}
                      />
                    </FullScreen>
                  </CreatorsContainer>
                </SeccionContainer>
              ))
            }
            <SeccionContainer translate={seccionActual}>
              <SeccionSidebar 
                test={test[0]}
                index="nueva"
                idTest={idTest} 
                llenarSecciones={llenarSecciones}
                seccionState={{seccionActual, setSeccionActual}}
                editState={{editActual, setEditActual}}
              />
              <CreatorsContainer>
                <FullScreen translate="0">
                  <EmptySeccion>Añade una nueva sección para comenzar a editar preguntas y reactivos.</EmptySeccion>
                </FullScreen>
              </CreatorsContainer>
            </SeccionContainer>
          </>
        )
      }
    </TestCreatorContainer>
  )
}

export default TestCreator;