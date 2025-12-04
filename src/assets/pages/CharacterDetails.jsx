import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCharacterById } from "../services/api";
import '../../App.css';

const CharacterDetails = () => {

  // Obter o ID do URL (ex: se o URL for /character/5, id será "5")
  const { id } = useParams();

  // Estados
  const [character, setCharacter] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch dos dados específicos
  useEffect(() => {
    const fetchDetails = async () => {
      try {
        setLoading(true);
        const data = await getCharacterById(id);
        setCharacter(data);

      } catch (err) {
        console.error(err);
        setError('Não foi possível carregar os detalhes do personagem.')
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [id]); // Executa sempre que o ID mudar

  // A. Estado de Carregamento
  if (loading) {
    return (
      <div className="text-center mt-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">A carregar...</span>
        </div>
      </div>
    );
  }

  // B. Estado de Erro
  if (error) {
    return (
      <div className="alert alert-danger text-center" role="alert">
        {error}
        <br />
        <Link to="/" className="btn btn-secondary mt-3">Voltar à Lista</Link>
      </div>
    );
  }

  // C. Estado de Sucesso (Detalhes)
  return (
    <div className="container mt-4">

      {/* Botão de Voltar */}
      <Link to="/" className="btn btn-outline-secondary mb-4">
      &larr; Voltar à Lista
      </Link>

      <div className="card shadow-lg mb-3">
        <div className="row g-0">

          {/* Coluna da Imagem */}
          <div className="col-md-4">
            <img src={character.image} 
            className="img-fluid rounded-start h-100" 
            alt={character.name} 
            style={{ objectFit: 'cover' }}
            />
          </div>

          {/* Coluna da Informação */}
          <div className="col-md-8">
            <div className="card-body">
              <h2 className="card-title fw-bold display-6">{character.name}</h2>

              <p className="card-text mt-3">
                <span className={`badge bg-${character.status === 'Alive' ? 'success' : character.status === 'Dead' ? 'danger' : 'secondary' } me-2`}>
                  {character.status}
                </span>

                <span className="text-muted">{character.species} - {character.gender}</span>
              </p>

              <hr />

              <div className="row mt-4">
                <div className="col-6">
                  <h6 className="fw-bold text-uppercase text-secondary">Origem</h6>
                  <p>{character.origin?.name}</p>
                </div>

                <div className="col-6">
                  <h6 className="fw-bold text-uppercase text-secondary">Localização Atual</h6>
                  <p>{character.location?.name}</p>
                </div>

                <div className="col-6 mt-3">
                  <h6 className="fw-bold text-uppercase text-secondary">Episódios</h6>
                  <p>Aparece em {character.episode?.length} episódios</p>
                </div>

                <div className="col-6 mt-3">
                  <h6 className="fw-bold text-uppercase text-secondary">Criado em</h6>
                  <p>{new Date(character.created).toLocaleDateString('pt-PT')}</p>
                </div>
              </div>


            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CharacterDetails;
