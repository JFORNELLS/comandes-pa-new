import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRegistre } from "../hooks/useRegistre";
import { ClientState } from "../types";
import ErrorMessage from "./ErrorMessage";

export function PaginaInici() {
  const [state, setState] = useState<ClientState>({
    id: 0,
    nomClient: "",
    password: "",
  });
  const { stateRegistre, dispatchRegistre } = useRegistre();
  const [error, setError] = useState("");
  const [passwordType, setPasswordType] = useState<"password" | "text">(
    "password"
  );
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const nouRegistre = {
      ...state,
      [name]: value,
    };
    setState(nouRegistre);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (Object.values(state).includes("")) {
      setError("Omple tots els camps");
    } else {
      const client = stateRegistre.clients.find(
        (c) => c.nomClient === state.nomClient && c.password === state.password
      );

      if (client) {
        dispatchRegistre({ type: "login", payload: { client } });
        navigate("/form");
      } else {
        setError("El nom de client o password no coincideixen");
      }
    }
  };

  const togglePasswordVisibility = () => {
    const type = (prev: "password" | "text") =>
      prev === "password" ? "text" : "password";
    setPasswordType(type);
  };

  const handleRegister = () => {
    navigate("/register");
  };

  return (
    <>
      <form
        className="bg-white p-6 rounded border border-gray-300 shadow-lg w-full max-w-lg"
        onSubmit={handleSubmit}
      >
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <h2 className="text-2xl font-bold mb-4 text-center">Inici de Sessió</h2>
        <div className="mb-4">
          <label className="font-bold mb-2" htmlFor="nomClient">
            Nom de Client:
          </label>
          <input
            className="w-full p-2 border border-gray-400 rounded"
            name="nomClient"
            type="text"
            value={state.nomClient}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label className="font-bold mb-2" htmlFor="password">
            Contrasenya:
          </label>
          <input
            className="w-full p-2 border border-gray-400 rounded"
            name="password"
            type={passwordType}
            value={state.password}
            onChange={handleChange}
          />
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="mt-2 text-blue-500"
          >
            {passwordType === "password" ? "Mostrar" : "Ocultar"} Contrassenya
          </button>
        </div>
        <button
          className=" text-blue-800 p-2"
          type="button"
          onClick={handleRegister}
        >
          Registra't
        </button>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 uppercase"
        >
          Entra
        </button>
      </form>
    </>
  );
}
