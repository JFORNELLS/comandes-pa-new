import { useContext } from "react";
import { ComandaContext } from "../context/ComandaContext";

// Hook personalitzat per utilitzar el context de la comanda
export const useComanda = () => {
  // Ús del hook useContext per obtenir el context de la comanda
  const context = useContext(ComandaContext);
  // Retorn del context obtingut
  return context;
};
