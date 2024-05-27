import { useReducer, createContext, Dispatch, ReactNode } from "react";
import {
  ComList,
  ComanadaActions,
  comandaReducer,
  initialState,
} from "../comanda-reducer/comanda-reducer";

// Definició dels props per al context de la comanda
type ComandaContextProps = {
  state: ComList;
  dispatch: Dispatch<ComanadaActions>;
};

// Definició dels props per al proveïdor de comanda
type ComandaProviderProps = {
  children: ReactNode;
};

// Creació del context de la comanda amb un valor inicial null
export const ComandaContext = createContext<ComandaContextProps>(null!);

// Component proveïdor de la comanda
export const ComandaProvider = ({ children }: ComandaProviderProps) => {
  // Ús de useReducer per gestionar l'estat de la comanda amb el reducer corresponent i l'estat inicial
  const [state, dispatch] = useReducer(comandaReducer, initialState);

  return (
    // Proveïdor del context de la comanda que proporciona l'estat i la funció dispatch als seus fills
    <ComandaContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      {children}
    </ComandaContext.Provider>
  );
};
