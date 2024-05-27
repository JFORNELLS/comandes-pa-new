import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import Form from "./components/Form";
import { useComanda } from "./hooks/useComanda";
import { PaginaInici } from "./components/PaginaInici";
import { PaginaRegistre } from "./components/PaginaRegistre";
import Menu from "./components/Menu";

function App() {
  // Obtenir l'estat del context de la comanda utilitzant el hook personalitzat useComanda
  const { state } = useComanda();

  // useEffect per emmagatzemar les comandes en localStorage cada vegada que l'estat de les comandes canviï
  useEffect(() => {
    localStorage.setItem("comandes", JSON.stringify(state.comandes));
  }, [state.comandes]);

  return (
    <>
      <Router>
        <header className="text-5xl py-10 text-center font-bold bg-blue-600 text-white">
          Fleca Fornells Olivets S.C.
        </header>
        <section className="flex flex-col items-center justify-center min-h-screen space-y-6">
          <Routes>
            <Route path="/register" element={<PaginaRegistre />} />
            <Route path="/" element={<PaginaInici />} />
            <Route
              path="/form"
              element={
                <section className=" py-10">
                  <div className="max-w-6xl mt-10 shadow-lg mx-auto">
                    <Menu />
                    <Form />
                  </div>
                </section>
              }
            />
          </Routes>
        </section>

      </Router>
    </>
  );
}

export default App;
