import { useEffect, useState } from "react";
import { getAllCharacters } from "../services/api"; // Importa a função de buscar todos os personagens
import CharacterCard from "../components/CharacterCard"; // Importa o componente de cartão de personagem

const Home = () => {
  // Estado para gerir os dados e a interface

  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true); // Começa a carregar
        const data = await getAllCharacters(); // Chama a API

        // A API do Rick and Morty devolve os personagens dentro de "results"
        setCharacters(data.results);
      } catch (err) {
        console.error(err);
        setError("Falha ao carregar os dados. Tenta novamente mais tarde.");
      } finally {
        setLoading(false); // Termina de carregar
      }
    };
    fetchData();
  }, []); // O array vazio [] garante que isto só corre uma vez ao montar o componente

  // Renderização Condicional (Estados da Interface)

  // A. Estado de Carregamente [cite: 52]
  if (loading) {
    return (
      <div className="text-center mt-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">A carregar...</span>
        </div>
      </div>
    );
  }

  // B. Estado de Erro [cite: 53]
  if (error) {
    return (
      <div className="alert alert-danger text-center" role="alert">
        {error}
      </div>
    );
  }

  // C. Estado de Sucesso (Listagem) [cite: 56]
  return (
    <section>
      <h1 className="mb-4 text-center">
        Personagens do Universo de Rick and Morty
      </h1>

      <div className="row">
        {characters.map((character) => (
          // Usamos o componente filho para cada item da lista
          <CharacterCard key={character.id} character={character} />
        ))}
      </div>

      {/* Se a lista estiver vazia (ausência de dados) [cite: 54] */}
      {characters.length === 0 && (
        <p className="text-center">Nenhum personagem encontrado.</p>
      )}
    </section>
  );
};

export default Home;
