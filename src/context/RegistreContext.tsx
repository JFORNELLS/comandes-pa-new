import { useReducer, createContext, Dispatch, ReactNode } from "react";
import { LlistaClients, ClientActions, clientReducer, initialRegistreState } from "../comanda-reducer/client-reducer";

type RegistreContextProps = {
    stateRegistre: LlistaClients
    dispatchRegistre: Dispatch<ClientActions>;
};

type RegistreProviderProps = {
    children: ReactNode;
};

export const RegistreContext = createContext<RegistreContextProps>(null!);

export const RegistreProvider = ({ children }: RegistreProviderProps) => {

    const [stateRegistre, dispatchRegistre] = useReducer(clientReducer, initialRegistreState);
  
    return (
      <RegistreContext.Provider
        value={{
          stateRegistre,
          dispatchRegistre,
        }}
      >
        {children}
      </RegistreContext.Provider>
    );
  };