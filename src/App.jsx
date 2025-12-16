import { BrowserRouter, Routes, Route } from "react-router-dom";

// Importar componentes globais (que aparecem em todas as páginas)
import Navbar from "./assets/components/Navbar";
import Footer from "./assets/components/Footer";

// Importar as páginas
import Home from "./assets/pages/Home";
import CharacterDetails from "./assets/pages/CharacterDetails";
import About from "./assets/pages/About";

// Bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css"; //CSS

function App() {
  return (
    <>
      {/* O BrowserRouter habilita a navegação SPA (Single Page Application).
      Permite trocar de páginas instantaneamente sem recarregar o browser. */}
      <BrowserRouter>
        <div className="d-flex flex-column min-vh-100">
          {/* A navbar fica fora das routes para aparecer em todas as páginas */}
          <Navbar />

          {/* O container do bootstrap centra o conteúdo e dá margens */}
          <main className="container my-4 flex-grow-1">
            {/* As rotas */}
            <Routes>
              {/* Rota para a página Inicial (Lista de Personagens) */}
              <Route path="/" element={<Home />} />

              {/* Rota Dinâmica: ":id" vai capturar o ID do personagem (ex: 1, 2, 50) */}
              <Route path="/character/:id" element={<CharacterDetails />} />

              {/* Rota para a página Sobre */}
              <Route path="/about" element={<About />} />

              {/* Rota para "Página não encontrada" */}
              <Route
                path="*"
                element={<h2>404 - Se nem a API sabe, imgina eu</h2>}
              />
            </Routes>
          </main>

          {/* O Footer também fica fora para aparecer sempre no fundo */}
          <Footer />
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
