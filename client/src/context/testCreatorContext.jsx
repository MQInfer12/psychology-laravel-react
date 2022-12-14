import React, { createContext, useContext, useState } from "react";
import { useEffect } from "react";

export const TestCreatorContext = createContext(null);

export const useTestCreatorContext = () => {
  const context = useContext(TestCreatorContext);
  if (!context) {
    throw new Error(
      "this contexts must be used whitin a TestCreatorContextProvider"
    );
  }
  return context;
};

export const TestCreatorContextProvider = ({ children }) => {
  const [dimensiones, setDimensiones] = useState([]);
  const [secciones, setSecciones] = useState([]);
  const [seccionActual, setSeccionActual] = useState(0);

  const updateSeccion = (modificar) => {
    setSecciones(old => {
      return old.map((seccion, i) => {
        if(i === seccionActual) {
          seccion = modificar(seccion);
        }
        return seccion;
      });
    });
  }
  
  const seccion = seccionActual < secciones.length ? secciones[seccionActual] : undefined;

  const value = { 
    seccionActual, 
    setSeccionActual, 
    secciones, 
    setSecciones, 
    dimensiones,
    setDimensiones,
    updateSeccion,
    seccion
  }

  /* useEffect(() => {
    console.log(secciones);
  }, [secciones]); */

  return (
    <TestCreatorContext.Provider value={value}>
      { children }
    </TestCreatorContext.Provider>
  )
}