const apiUrl = 'https://api.pokemontcg.io/v1/cards';

async function fetchPokemonCards() {
    const response = await fetch(apiUrl);
    if (!response.ok) {
        throw new Error("Falha ao renderizar cartas!");
    }
    const data = await response.json();
    return data.cards;
}

async function searchPokemon(searchInput) {
    const response = await fetch(`${apiUrl}?name=${searchInput}`);
    if (!response.ok) {
        throw new Error("Falha ao procurar cartas!");
    }
    const data = await response.json();
    return data.cards;
}

async function filterPokemon(selectedType) {
    const response = await fetch(`${apiUrl}?types=${selectedType}`);
    if (!response.ok) {
        throw new Error("Falha ao filtrar tipos de Pokemon!");
    }
    const data = await response.json();
    return data.cards;
}

export { fetchPokemonCards, searchPokemon, filterPokemon };
