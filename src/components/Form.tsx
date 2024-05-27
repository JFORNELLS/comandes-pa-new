import { useState, ChangeEvent, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { productes, integral, bolleria } from "../data/productes";
import { ComandaState } from "../types";
import { useComanda } from "../hooks/useComanda";
import ErrorMessage from "./ErrorMessage";
import { useRegistre } from "../hooks/useRegistre";

export default function Form() {
  // Definim l'estat inicial de la comanda
  const initialState: ComandaState = {
    id: 0,
    date: "",
    client: "",
    productes: {},
  };

  // Creem l'estat local per a la comanda
  const [comanda, setComanda] = useState<ComandaState>(initialState);
  const { state, dispatch } = useComanda();
  const [error, setError] = useState("");
  const { stateRegistre } = useRegistre();
  const { dispatchRegistre } = useRegistre();
  const navigate = useNavigate();

  // Obtener el contador inicial de comandes desde localStorage
  const getInitialCounter = () => {
    const storedCounter = localStorage.getItem("contadorComandes");
    return storedCounter ? parseInt(storedCounter, 10) : 0;
  };

  const [contadorComandes, setContadorComandes] = useState(getInitialCounter);

  // useEffect per actualitzar la comanda local quan canvia el comandaId global
  useEffect(() => {
    if (state.comandaId) {
      // Filtrar per trobar la comanda amb el comandaId seleccionat
      const selectId = state.comandes.filter(
        (h) => h.id === state.comandaId
      )[0];
      // Actualitzar l'estat local amb la comanda seleccionada
      setComanda(selectId);
    }
  }, [state.comandaId]);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError("");
        // setComanda(initialState);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  // Gestor de canvis per actualitzar els productes de la comanda
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const producte = e.target.id;
    const value = +e.target.value;
    const update = {
      ...comanda,
      productes: {
        ...comanda.productes,
        [producte]: value,
      },
    };

    setComanda(update);
  };

  // Funció per verificar si la comanda està buida
  const isEmpty = () => {
    return !Object.values(comanda.productes).some((value) => value > 0);
  };

  // Funció per obtenir la data de demà en format YYYY-MM-DD
  function getTomorrowDateString() {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().slice(0, 10);
  }

  // Gestor de l'enviament del formulari
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newId = getTomorrowDateString();
    console.log(stateRegistre.usuari?.nomClient);
    // Comprovar si ja existeix una comanda per demà amb un ID diferent
    const idExists = state.comandes.some(
      (comanda: ComandaState) =>
        comanda.date === newId &&
        comanda.id !== state.comandaId &&
        comanda.client === stateRegistre.usuari?.nomClient
    );

    if (idExists) {
      setError(
        "Ja has fet la comanda per demà, pots modicar o suprimir l'existent"
      );
    } else {
      const update = {
        ...comanda,
        id: contadorComandes + 1,
        date: getTomorrowDateString(),
        client: stateRegistre.usuari?.nomClient ?? "",
      };

      // Actualizar el contador y guardar en localStorage
      const newCounter = contadorComandes + 1;
      setContadorComandes(newCounter);
      localStorage.setItem("contadorComandes", newCounter.toString());

      // Despatxar l'acció per guardar la nova comanda
      dispatch({ type: "save-comanda", payload: { newComanda: update } });
      // Reiniciar l'estat local de la comanda
      setComanda(initialState);
    }
  };


  return (
    <>
      <form
        className="bg-blue-100 border-8 border-blue-500 py-5 shadow p-5 max-w-6xl mx-auto"
        onSubmit={handleSubmit}
      >
        <div className="grid grid-cols-3 gap-6 pb-10 px-6">
          <div className="col-span-1">
            <div className="border border-slate-300 rounded-lg p-4">
              <div className="p-3">
                <h2 className="text-center text-2xl font-bold">PA NORMAL</h2>
              </div>
              <div className="grid grid-cols-1 gap-3 gap-x-4">
                {productes.map((product) => (
                  <div
                    key={product.id}
                    className="border-t border-slate-300 pt-2 flex justify-between"
                  >
                    <label className="text-lg" htmlFor={product.producte}>
                      {product.producte}
                    </label>
                    <input
                      className="w-12 h-9 p-1 border-2 border-slate-300 rounded-lg"
                      type="tel"
                      id={product.producte}
                      value={comanda.productes[product.producte] || ""}
                      onChange={handleChange}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="col-span-1">
            <div className="border border-slate-300 rounded-lg p-4">
              <div className="p-3">
                <h2 className="text-center text-2xl font-bold">INTEGRALS</h2>
              </div>
              <div className="grid grid-cols-1 gap-3 gap-x-4">
                {integral.map((integ) => (
                  <div
                    key={integ.id}
                    className="border-t border-slate-300 pt-2 flex justify-between"
                  >
                    <label className="text-lg" htmlFor={integ.producte}>
                      {integ.producte}
                    </label>
                    <input
                      className="w-12 h-9 p-1 border-2 border-slate-300 rounded-lg"
                      type="tel"
                      id={integ.producte}
                      value={comanda.productes[integ.producte] || ""}
                      onChange={handleChange}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="col-span-1">
            <div className="border border-slate-300 rounded-lg p-4">
              <div className="p-3">
                <h2 className="text-center text-2xl font-bold">BOLLERIA</h2>
              </div>
              <div className="grid grid-cols-1 gap-3 gap-x-4">
                {bolleria.map((bolleria) => (
                  <div
                    key={bolleria.id}
                    className="border-t border-slate-300 pt-2 flex justify-between"
                  >
                    <label className="text-lg" htmlFor={bolleria.producte}>
                      {bolleria.producte}
                    </label>
                    <input
                      className="w-12 h-9 p-1 border-2 border-slate-300 rounded-lg"
                      type="tel"
                      id={bolleria.producte}
                      value={comanda.productes[bolleria.producte] || ""}
                      onChange={handleChange}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <input
          type="submit"
          value="GUARDAR"
          className="py-3 bg-blue-600 hover:bg-blue-300 p-2 text-white w-full cursor-pointer rounded-lg disabled:opacity-10"
          disabled={isEmpty()}
        />
      </form>
    </>
  );
}
