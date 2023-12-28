import React, { createContext, useContext, useState } from "react";

const ViajeContext = createContext();

export const ViajeProvider = ({ children }) => {
  const [viaje, setViaje] = useState({ id: null, nombre: null });

  const setInfoViaje = (id, nombre) => {
    setViaje({ id, nombre });
  };

  return (
    <ViajeContext.Provider value={{ viaje, setInfoViaje }}>
      {children}
    </ViajeContext.Provider>
  );
};

export const useViaje = () => {
  return useContext(ViajeContext);
};
