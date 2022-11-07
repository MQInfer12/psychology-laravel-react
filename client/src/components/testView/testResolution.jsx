import React, { useEffect } from "react";
import { useState } from "react";
import styled from "styled-components";
import { getFullTest } from "../../services/test";
import { updateRespuesta } from "../../services/respuesta";
import Modal from "../globals/modal";
import ConfirmModal from "../globals/confirmModal";
import { BlackTextLoader } from "../../styles/loaders";
import RadioButton from "./radioButton";
import PageSlider from "./pageSlider";

import { useContext } from 'react';
import { ThanksContext } from '../../context/thanksContext';
import { useNavigate } from "react-router-dom";

const TestResolution = ({
  loading,
  idTest,
  nombreTest,
  activateSend,
  infoSend,
  idRespuesta
}) => {
  const navigate = useNavigate();
  const { setActivateThanks } = useContext(ThanksContext);

  const [showAlert, setShowAlert] = useState(false);
  const [secciones, setSecciones] = useState([]);
  const [preguntasTotales, setPreguntasTotales] = useState(0);
  const [indexPregunta, setIndexPregunta] = useState(0);
  const [resultados, setResultados] = useState({});

  let cont = 0;

  const handleSubmit = async () => {
    const form = {
      puntuaciones: resultados,
    };
    const res = await updateRespuesta(form, idRespuesta);
    const resJson = await res?.json();
    if (resJson.mensaje == "se guardo correctamente") {
      setActivateThanks(true);
      navigate('/dashboard/tests/thanks');
    }
  };

  const llenarTestEntero = async () => {
    const res = await getFullTest(idTest);
    const resJson = await res?.json();
    setSecciones(resJson.secciones);

    let contPreguntas = 0;
    resJson.secciones.forEach((seccion) => {
      contPreguntas += seccion.preguntas.length;
    });
    setPreguntasTotales(contPreguntas);
  };

  useEffect(() => {
    if (idTest) {
      llenarTestEntero();
    }
  }, [idTest]);

  return (
    <TestResolutionContainer>
      {showAlert && (
        <Modal cerrar={() => setShowAlert(false)}>
          <ConfirmModal
            sure={handleSubmit}
            cerrar={() => setShowAlert(false)}
            text="No podrás modificar tus respuestas luego"
          />
        </Modal>
      )}
      {loading ? (
        <TitleContainer>
          <BlackTextLoader width="300px" fontSize="60px" />
        </TitleContainer>
      ) : (
        <ResolutionTitle>{nombreTest}</ResolutionTitle>
      )}
      {
        activateSend ? (
          <StartText>Comienza tu test</StartText>
        ) : (
          <StartTextPurple>¡{infoSend}!</StartTextPurple>
        )
      }

      <TestContainer>
        <PreguntasContainer>
          {secciones.map((seccion, i) =>
            seccion.preguntas.map((pregunta, j) => {
              cont++;
              return (
                <UnaPreguntaContainer key={j} translate={indexPregunta}>
                  <PreguntaContainer>
                    <PreguntaIndex>
                      P{cont}: {cont}/{preguntasTotales}
                    </PreguntaIndex>
                    <Pregunta>{pregunta.descripcion}</Pregunta>
                  </PreguntaContainer>
                  <ReactivosContainer>
                    {seccion.reactivos.map((reactivo, k) => (
                      <RadioButton 
                        key={k} 
                        indexPregunta={indexPregunta}
                        setResultados={setResultados}
                        pregunta={pregunta}
                        reactivo={reactivo}
                      />
                    ))}
                  </ReactivosContainer>
                </UnaPreguntaContainer>
              );
            })
          )}
        </PreguntasContainer>

        <PageSlider
          resultados={resultados}
          indexPregunta={indexPregunta}
          setIndexPregunta={setIndexPregunta}
          preguntasTotales={preguntasTotales}
          activateSend={activateSend}
          infoSend={infoSend}
          setShowAlert={setShowAlert}
        />
      </TestContainer>
    </TestResolutionContainer>
  );
};

export default TestResolution;

const TestResolutionContainer = styled.div`
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  padding: 0px 40px 40px;

  @media (max-width: 500px) {
    padding: 0px 20px 40px;
  }
`;

const TitleContainer = styled.div`
  height: 90px;
  display: flex;
  align-items: center;
`;

const ResolutionTitle = styled.h1`
  font-size: 60px;
  font-weight: 600;
  text-align: center;
  width: fit-content;
  &::after {
    content: ".";
    color: #6209db;
  }
`;

const StartText = styled.h4`
  font-size: 20px;
  font-weight: 400;
`;

const StartTextPurple = styled.h4`
  font-size: 20px;
  font-weight: 400;
  color: #6209db;
`;

const TestContainer = styled.div`
  margin-top: 40px;
  background: #6209db;
  border-radius: 15px;
  color: #ffffff;
  position: relative;
  overflow: hidden;
`;

const PreguntasContainer = styled.div`
  height: 471px;
  display: flex;
  overflow: hidden;

  @media (max-width: 1260px) {
    height: max-content;
  }
`;

const UnaPreguntaContainer = styled.div`
  transform: translateX(${(props) => props.translate * -100}%);
  min-width: 100%;
  padding: 40px;
  gap: 36px;
  display: flex;
  transition: all 1s;

  @media (max-width: 1260px) {
    flex-direction: column;
    gap: 16px;
    padding: 24px;
  }
`;

const PreguntaContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 30px;
`;

const PreguntaIndex = styled.h2`
  font-weight: 600;
  font-size: 24px;
`;

const Pregunta = styled.h3`
  font-weight: 600;
  font-size: 24px;

  @media (max-width: 1260px) {
    font-size: 18px;
  }
`;

const ReactivosContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 70%;

  @media (max-width: 1260px) {
    width: 100%;
  }
`;