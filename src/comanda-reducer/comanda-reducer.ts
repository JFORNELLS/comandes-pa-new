import { ComandaState } from "../types";

// Definició dels tipus d'accions possibles per al reducer
export type ComanadaActions =
  | { type: "save-comanda"; payload: { newComanda: ComandaState } }
  | { type: "set-comandaId"; payload: { id: number} }
  | { type: "delete-comanda"; payload: { id: number} };

// Definició de l'estat de la llista de comandes
export type ComList = {
  comandes: ComandaState[];
  comandaId: number;
};

// Funció per obtenir les comandes emmagatzemades en localStorage
const localStorageComandes = () => {
  const comandes = localStorage.getItem("comandes");
  return comandes ? JSON.parse(comandes) : [];
};

// Estat inicial de la llista de comandes
export const initialState: ComList = {
  comandes: localStorageComandes(),
  comandaId: 0,
};

// Funció reducer per gestionar les accions sobre la llista de comandes
export const comandaReducer = (
  state: ComList = initialState,
  action: ComanadaActions
) => {
  if (action.type === "save-comanda") {
    let updateComanda: ComandaState[] = [];
    if (state.comandaId) {
      // Actualitzar la comanda existent si hi ha un comandaId
      updateComanda = state.comandes.map((comanda) =>
        comanda.id === state.comandaId ? action.payload.newComanda : comanda
      );
    } else {
      // Afegir una nova comanda si no hi ha un comandaId
      updateComanda = [...state.comandes, action.payload.newComanda];
    }

    return {
      ...state,
      comandes: updateComanda,
      comandaId: "",
    };
  }

  if (action.type === "set-comandaId") {
    // Establir el comandaId seleccionat
    return {
      ...state,
      comandaId: action.payload.id,
    };
  }

  if (action.type === "delete-comanda") {
    // Eliminar la comanda amb el id especificat
    const deleteComandaId = state.comandes.filter(
      (comanda) => comanda.id !== action.payload.id
    );
    return {
      ...state,
      comandes: deleteComandaId,
    };
  }

  // Retornar l'estat actual si l'acció no és reconeguda
  return state;
};
