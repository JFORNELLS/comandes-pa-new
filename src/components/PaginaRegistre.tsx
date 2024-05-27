import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { ClientState } from "../types";
import { useRegistre } from "../hooks/useRegistre";
import ErrorMessage from "./ErrorMessage";

export function PaginaRegistre() {
  const navigate = useNavigate();
  const initialState: ClientState = { id: 0, nomClient: "", password: "" };
  const [stateClient, setClient] = useState<ClientState>(initialState);
  const { stateRegistre, dispatchRegistre } = useRegistre();
  const [error, setError] = useState("");
  const [passwordType, setPasswordType] = useState<"password" | "text">(
    "password"
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const nouRegistre = {
      ...stateClient,
      id: stateRegistre.clients.length + 1,
      [name]: value,
    };
    setClient(nouRegistre);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      stateClient.nomClient.length === 0 ||
      stateClient.password.length === 0
    ) {
      setError("Omple tots els camps");
    } else {
      const client = stateRegistre.clients.some(
        (c) => c.nomClient === stateClient.nomClient
      );
      if (!client) {
        const update = {
          ...stateClient,
        };
        dispatchRegistre({ type: "register", payload: { nouClient: update } });
        navigate("/");
      } else {
        setError("Aquest nom ja esxisteix");
      }
    }
  };

  const handleInici = () => {
    navigate("/");
  };

  const togglePasswordVisibility = () => {
    const type = (prev: "password" | "text") =>
      prev === "password" ? "text" : "password";
    setPasswordType(type);
  };

  return (
    <>
      <form
        className="bg-white p-6 rounded border border-gray-300 shadow-lg w-full max-w-lg"
        onSubmit={handleSubmit}
      >
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <h2 className="text-2xl font-bold mb-4 text-center">Registra't</h2>
        <div className="mb-4">
          <label className="font-bold mb-2" htmlFor="nomClient">
            Nom de Client:
          </label>
          <input
            type="text"
            name="nomClient"
            className="w-full p-2 border border-gray-400 rounded"
            value={stateClient.nomClient}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label className="font-bold mb-2" htmlFor="password">
            Contrasenya:
          </label>
          <input
            type={passwordType}
            name="password"
            className="w-full p-2 border border-gray-400 rounded"
            value={stateClient.password}
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
          onClick={handleInici}
        >
          Inicia Sessió
        </button>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 uppercase"
        >
          Resgistra't
        </button>
      </form>
    </>
  );
}
