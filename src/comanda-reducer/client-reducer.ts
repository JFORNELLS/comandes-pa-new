import { ClientState } from "../types";

export type ClientActions =
  | { type: "register"; payload: { nouClient: ClientState } }
  | { type: "login"; payload: { client: ClientState } }
  | { type: "logout" };

export type LlistaClients = {
  clients: ClientState[];
  usuari: ClientState | null;
};

const localStorageRegistre = () => {
  const clients = localStorage.getItem("clients");
  return clients ? JSON.parse(clients) : [];
};

const localStorageUsuari = () => {
  const usuari = localStorage.getItem("usuari");
  return usuari ? JSON.parse(usuari) : null;
};

export const initialRegistreState: LlistaClients = {
  clients: localStorageRegistre(),
  usuari: localStorageUsuari(),
};

export const clientReducer = (
  state: LlistaClients = initialRegistreState,
  action: ClientActions
): LlistaClients => {
  if (action.type === "register") {
    const update = [...state.clients, action.payload.nouClient];
    localStorage.setItem("clients", JSON.stringify(update));
    return {
      ...state,
      clients: update,
    };
  }

  if (action.type === "login") {
    const update = action.payload.client;
    localStorage.setItem("usuari", JSON.stringify(update));
    return {
      ...state,
      usuari: update,
    };
  }

  if (action.type === "logout") {
    localStorage.removeItem("usuari");
    return {
      ...state,
      usuari: null,
    };
  }

  return state;
};
