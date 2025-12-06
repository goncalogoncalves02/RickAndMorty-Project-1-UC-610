import { useEffect, useState } from "react";
import { getAllCharacters } from "../services/api"; // Importa a função de buscar todos os personagens
import CharacterCard from "../components/CharacterCard"; // Importa o componente de cartão de personagem
import SearchBar from "../components/SearchBar"; // Importa o componente de barra de pesquisa

const Home = () => {
  // Estado para gerir os dados e a interface

  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true); // Começa a carregar
        setError(null); // Limpa o erro
        const data = await getAllCharacters(1, searchTerm); // Chama a API

        // A API do Rick and Morty devolve os personagens dentro de "results"
        setCharacters(data.results);
      } catch (err) {
        setCharacters([]);
        if (searchTerm) {
          setError(`Não encontrámos ninguém com o nome "${searchTerm}".`);
        } else {
          console.error(err);
          setError("Falha ao carregar os dados. Tenta novamente mais tarde.");
        }
      } finally {
        setLoading(false); // Termina de carregar
      }
    };
    fetchData();
  }, [searchTerm]); // <--- O useEffect corre sempre que 'searchTerm' muda

  // Renderização Condicional (Estados da Interface)

  // Função que será chamada pelo componente SearchBar
  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  return (
    <section>
      <div className="text-center mb-4">
        <h1 className="mb-3">Personagens do Universo</h1>
        <p className="lead text-muted">
          Explora a base de dados do Rick and Morty
        </p>
      </div>

      {/* Colocar a Barra de Pesquisa aqui */}
      <div className="row justify-content-center">
        <div className="col-12 col-md-8">
          <SearchBar onSearch={handleSearch} />
        </div>
      </div>

      {/* Loading */}
      {loading && (
        <div className="text-center mt-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">A carregar...</span>
          </div>
        </div>
      )}

      {/* Erro */}
      {error && !loading && (
        <div className="alert alert-warning text-center" role="alert">
          {error}
        </div>
      )}

      {/* Listagem */}
      {!loading && !error && (
        <div className="row">
          {characters.map((character) => (
            <CharacterCard key={character.id} character={character} />
          ))}
        </div>
      )}
    </section>
  );
};

export default Home;
