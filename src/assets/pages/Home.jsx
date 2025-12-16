import { useEffect, useState } from "react";
import { getAllCharacters } from "../services/api"; // Importa a função de buscar todos os personagens
import CharacterCard from "../components/CharacterCard"; // Importa o componente de cartão de personagem
import SearchBar from "../components/SearchBar"; // Importa o componente de barra de pesquisa

const Home = () => {
  // Estado para gerir os dados e a interface

  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Estados
  const [searchTerm, setSearchTerm] = useState("");
  const [status, setStatus] = useState(""); // Filtro de Status
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      window.scrollTo({ top: 0, behavior: "smooth" }); // Scroll para o topo suavemente
      try {
        setLoading(true); // Começa a carregar
        setError(null); // Limpa o erro

        // Agora enviamos página, nome E status para a API
        const data = await getAllCharacters(page, searchTerm, status); // Chama a API

        // A API do Rick and Morty devolve os personagens dentro de "results"
        setCharacters(data.results);
        setTotalPages(data.info.pages); // Guardamos o total de páginas que a API indica

      } catch (err) {
        setCharacters([]);
        setTotalPages(0);
        if (searchTerm || status) {
          setError(`Não encontrámos ninguém com o nome "${searchTerm} ou status "${status}".`);
        } else {
          console.error(err);
          setError("Falha ao carregar os dados. Tenta novamente mais tarde.");
        }
      } finally {
        setLoading(false); // Termina de carregar
      }
    };
    fetchData();
  }, [searchTerm, page, status]); // O useEffect corre sempre que muda: termo, página OU status

  // Renderização Condicional (Estados da Interface)

  // Função que será chamada pelo componente SearchBar
  const handleSearch = (term) => {
    setSearchTerm(term);
    setPage(1); // Resetamos a página para 1 quando muda o termo de pesquisa
  };

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
    setPage(1); // Reset à paginação quando mudamos o filtro
  };

  // Função para mudar de página
  const handleNextPage = () => {
    if (page < totalPages) setPage((prev) => prev + 1);
  };

  const handlePrevPage = () => {
    if (page > 1) setPage((prev) => prev - 1);
  };

  return (
    <section>
      <div className="text-center mb-4">
        <h1 className="mb-3">Personagens do Universo</h1>
        <p className="lead text-muted">
          Explora a base de dados do Rick and Morty
        </p>
      </div>

      {/* ÁREA DE PESQUISA E FILTROS */}
      <div className="row justify-content-center mb-4">
        <div className="col-12 col-md-10 d-flex flex-column flex-md-row gap-2 align-items-center">
          
          {/* Componente SearchBar (ocupa o espaço disponível) */}
          <div className="flex-grow-1 w-100">
            <SearchBar onSearch={handleSearch} />
          </div>

          {/* NOVO: Dropdown de Filtro de Status */}
          <select 
            className="form-select w-auto" 
            value={status} 
            onChange={handleStatusChange}
            aria-label="Filtrar por estado"
            style={{ height: '38px' }} // Altura para alinhar com o botão da searchbar
          >
            <option value="">Status</option>
            <option value="alive">Vivo 🟢</option>
            <option value="dead">Morto 🔴</option>
            <option value="unknown">Desconhecido ❓</option>
          </select>

        </div>
      </div>

      {/* LOADING */}
      {loading && (
        <div className="text-center mt-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">A carregar...</span>
          </div>
        </div>
      )}

      {/* ERRO */}
      {error && !loading && (
        <div className="alert alert-warning text-center" role="alert">
          {error}
        </div>
      )}

      {/* LISTAGEM DE CARTÕES */}
      {!loading && !error && (
        <>
          <div className="row">
            {characters.map((character) => (
              <CharacterCard key={character.id} character={character} />
            ))}
          </div>

          {/* PAGINAÇÃO */}
          {totalPages > 1 && (
            <div className="d-flex justify-content-center align-items-center gap-3 mt-5 mb-5">
              <button 
                className="btn btn-outline-primary" 
                onClick={handlePrevPage}
                disabled={page === 1}
              >
                &larr; Anterior
              </button>

              <span className="fw-bold">
                Página {page} de {totalPages}
              </span>

              <button 
                className="btn btn-outline-primary" 
                onClick={handleNextPage}
                disabled={page === totalPages}
              >
                Seguinte &rarr;
              </button>
            </div>
          )}
        </>
      )}
    </section>
  );
};

export default Home;
