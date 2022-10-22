import React from 'react';
import styled from 'styled-components';

const DivLoader = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 16px;
`;

const Loader = styled.div`
  width: ${props => props.width};
  height: ${props => props.height};
  border-radius: 50%;
  border: 8px solid rgba(0, 0, 0, 0.2);
  border-top-color: #2264E6;
  animation: spin 1.2s ease infinite;

  @keyframes spin {
    0% {
      border-top-color: #2264E6;
      transform: rotate(0deg);
    }
    50% {
      border-top-color: #660BE1;
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const SpanLoader = styled.span`
  color: #1a3260;
  text-transform: uppercase;
`;

const Cargando = ({ text = true, width = "80px", height = "80px" }) => {
  return (
    <DivLoader>
      <Loader width={width} height={height}></Loader>
      {
        text && 
        <SpanLoader>Cargando...</SpanLoader>
      }
    </DivLoader>
  )
}

export default Cargando;