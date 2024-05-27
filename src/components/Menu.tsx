import { useState } from "react";
import { useRegistre } from "../hooks/useRegistre";
import { useNavigate } from "react-router-dom";
import { useComanda } from "../hooks/useComanda";
import { PencilSquareIcon, XCircleIcon } from "@heroicons/react/24/outline";

export default function Menu() {
  const { stateRegistre, dispatchRegistre } = useRegistre();
  const { state, dispatch } = useComanda();
  const [isOpen, setOpen] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleMouseEnter = () => {
    setOpen(true);
  };

  const handleMouseLeave = () => {
    setOpen(false);
  };

  const handleLogout = () => {
    dispatchRegistre({ type: "logout" });
    navigate("/");
  };


  const getLastOrderDate = () => {
    const orders = state.comandes.filter(
      c => c.client === stateRegistre.usuari?.nomClient
    );
    const lastOrder = orders.pop();
    return lastOrder?.date;
  };

  const getLastOrderProducts = () => {
    const orders = state.comandes.filter(
      c => c.client === stateRegistre.usuari?.nomClient
    );
    const lastOrder = orders.pop();
    return lastOrder?.productes;
  };

  const lastOrderProducts = getLastOrderProducts();

  return (
    <>
      <h2 className="text-2xl font-bold p-2">
        {stateRegistre.usuari
          ? `Sessió de: ${stateRegistre.usuari.nomClient}`
          : "Benvingut"}
      </h2>
      <div className="relative" onMouseLeave={handleMouseLeave}>
        <nav className="text-lg font-bold bg-blue-500 p-4">
          <ul className="flex justify-end space-x-4">

            <li className="relative">
              <button
                onMouseEnter={handleMouseEnter}
                className="text-white hover:text-gray-300"
              >Comanda:{" "}
                {state.comandes.length === 0 ? "no hi ha comanda" : `${getLastOrderDate()}`}
              </button>
              {isOpen && lastOrderProducts && (
                <div
                  className="origin-top-right absolute right-0 mt-2 w-80 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10"
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  <div className="py-1">
                    <ul>
                      {Object.entries(lastOrderProducts).map(
                        ([producte, quantitat]) => (
                          <li
                            key={producte}
                            className="flex justify-between px-4 py-2 text-lg text-gray-700 hover:bg-gray-100"
                          >
                            <span className="font-bold">{producte}:</span>{" "}
                            <span className="">{quantitat}</span>
                          </li>
                        )
                      )}
                    </ul>
                  </div>
                  <div className="flex justify-end space-x-2 px-4 py-2">
                    {state.comandes
                      .filter(
                        c => c.client === stateRegistre.usuari?.nomClient
                      )
                      .map((c) => (
                        <div key={c.id} className="flex items-center space-x-2">
                          <button
                            onClick={() =>
                              dispatch({
                                type: "set-comandaId",
                                payload: { id: c.id },
                              })
                            }
                          >
                            <PencilSquareIcon className="h-8 w-8 text-gray-500" />
                          </button>
                          <button
                            onClick={() =>
                              dispatch({
                                type: "delete-comanda",
                                payload: { id: c.id },
                              })
                            }
                          >
                            <XCircleIcon className="h-8 w-8 text-red-500" />
                          </button>
                        </div>
                      ))}
                  </div>
                </div>
              )}
            </li>
            <li>
              <button
                onClick={handleLogout}
                className="text-white hover:text-gray-300"
              >
                Tanca Sessió
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
}
