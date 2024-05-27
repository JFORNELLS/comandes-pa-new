import { useContext } from "react";
import { RegistreContext } from "../context/RegistreContext";

// Hook personalitzat per utilitzar el context de la comanda
export const useRegistre = () => {
  // Ús del hook useContext per obtenir el context de la comanda
  const context = useContext(RegistreContext);
  // Retorn del context obtingut
  return context;
};