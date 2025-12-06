import { useState } from "react";

const SearchBar = ({ onSearch }) => {
    const [input, setInput] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault(); // Evita que a página recarregue
        onSearch(input); // Envia o texto para o componente pai (Home.jsx)
    };

    return (
        <form onSubmit={handleSubmit} className="d-flex mb-5">
            <input 
                type="text"
                className="form-control me-2"
                placeholder="Pesquisar personagem (ex: Rick, Morty)..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
            />

            <button className="btn btn-outline-sucess" type="submit">
                Pesquisar
            </button>

            {/* Botão para limpar a pesquisa, só aparece se houver texto */}
            {input && (
                <button
                type="button"
                className="btn btn-outline-danger ms-2"
                onClick={() => {
                    setInput('');
                    onSearch(''); // Limpa a pesquisa na Home também
                }}>
                    Limpar
                </button>
            )}
        </form>
    );
};

export default SearchBar;