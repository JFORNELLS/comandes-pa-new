// Definició del tipus Productes
export type Productes = {
  id: number;          // Identificador únic del producte
  producte: string;    // Nom del producte
};

// Definició del tipus ComandaState
export type ComandaState = {
  id: number;
  date: string;   
  client: string;      // Identificador únic de la comanda
  productes: {        // Objecte que representa els productes de la comanda
    [producte: string]: number; // Clau-valor on la clau és el nom del producte i el valor és la quantitat
  };
};


export type ClientState = {
  id: number,
  nomClient: string,
  password: string
};

export type UserState = {
  currentUser: { id: number; nomClient: string } | null;
};

export type UserActions = 
  | { type: 'login'; payload: { id: number; nomClient: string } }
  | { type: 'logout' };

