import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    // Navbar escura do Bootstrap
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-4">
      <div className="container">
        {/* Logótipo / Nome do Site (Link para a Home) */}
        <Link className="navbar-brand fw-bold" to="/">
          Rick and Morty Wiki
        </Link>

        {/* Botão "Hambúrger" para telemóveis */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Links de Navegação */}
        <div className="collapse navbar-collapse" id="navbarNav">
          {/* ms-auto empurra os links para a direita */}
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              {/* NavLink é igual ao Link, mas adiciona a classe "active" automaticamente */}
              <NavLink to="/" className="nav-link">
                Personagens
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink to="/about" className="nav-link">
                Sobre o Projeto
              </NavLink>
            </li>

          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;