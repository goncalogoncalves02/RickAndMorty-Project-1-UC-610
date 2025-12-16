import { Link } from "react-router-dom";

function CharacterCard({ character }) {
  // Vamos definir uma cor para o status (verde para vivo, vermelho para morto, cinza para o resto)
  const statusColor =
    character.status === "Alive"
      ? "success"
      : character.status === "Dead"
      ? "danger"
      : "secondary";

  return (
    <div className="col-12 col-md-6 col-lg-4 col-xl-3 mb-4">
      {/* Classe 'h-100' garante que todos os cartões têm a mesma altura */}
      <div className="card h-100 shadow-sm hover-effect">
        <img
          src={character.image}
          className="card-img-top"
          alt={character.name}
        />

        <div className="card-body">
          <h5 className="card-title text-truncate">{character.name}</h5>

          <p className="card-text">
            {/* O "badge" do Bootstrap cria uma entiqueta colorida */}

            <span className={`badge bg-${statusColor} me-2`}>
              {character.status}
            </span>
            <span className="text-muted">{character.species}</span>
          </p>

          {/* Botão para ver detalhes */}
          <Link
            to={`/character/${character.id}`}
            className="btn btn-outline-primary w-100 mt-2 botao-verde"
          >
            Ver detalhes
          </Link>
        </div>
      </div>
    </div>
  );
}

export default CharacterCard;
