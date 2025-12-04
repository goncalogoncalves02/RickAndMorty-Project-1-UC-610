// Definimos o URL base da API para não estarmos sempre a repetir o endereço
const BASE_URL = 'https://rickandmortyapi.com/api';

/**
 * Função para buscar a lista de personagens.
 * Aceita parâmetros para paginação e filtros (nome e status).
 * Se não passarmos nada, assume a página 1 e sem filtros.
 */

export const getAllCharacters = async (page = 1, name = "", status = "") => {
    
    // Construção do URL com Query Parameters
    const url = `${BASE_URL}/character/?page=${page}&name=${name}&status=${status}`;

    try {

        const response = await fetch(url);

        // Se a resposta não for OK (ex: 404 não encontrado), lançamos um erro
        if (!response.ok) {
            throw new Error(`Erro na API: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Erro ao buscar personagens:", error);
        throw error;
    }
};

/**
 * Função para buscar os detalhes de UM personagem específico pelo ID.
 */

export const getCharacterById = async (id) => {
    
    const url = `${BASE_URL}/character/${id}`;

    try {
        
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Erro ao buscar detalhe: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Erro ao buscar detalhes do personagem:", error);
        throw error;
    }
}