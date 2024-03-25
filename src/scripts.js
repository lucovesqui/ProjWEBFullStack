import { fetchPokemonCards, searchPokemon, filterPokemon } from './api.js';

document.addEventListener("DOMContentLoaded", () => {
    const cardContainer = document.getElementById("card-container");
    const cardDetails = document.getElementById("card-details");

    async function renderCards(cards) {
        cardContainer.innerHTML = "";
        if (cards.length === 0) {
            cardContainer.innerHTML = "<p>Não encontramos nenhuma carta!</p>";
            return;
        }
        cards.forEach(card => {
            const cardElement = document.createElement("div");
            cardElement.classList.add("card");
            cardElement.onclick = () => showCardDetails(card);

            const cardImage = document.createElement("img");
            cardImage.src = card.imageUrl;
            cardImage.alt = card.name;

            const cardName = document.createElement("p");
            cardName.textContent = card.name;

            cardElement.appendChild(cardImage);
            cardElement.appendChild(cardName);

            cardContainer.appendChild(cardElement);
        });
    }

    function showCardDetails(card) {
        cardDetails.innerHTML = "";
        const cardDetailElement = document.createElement("div");
        cardDetailElement.classList.add("card-detail");

        const cardImage = document.createElement("img");
        cardImage.src = card.imageUrlHiRes;
        cardImage.alt = card.name;

        const cardName = document.createElement("h2");
        cardName.textContent = card.name;

        const cardType = document.createElement("p");
        cardType.textContent = `Type: ${card.types.join(", ")}`;

        const cardDescription = document.createElement("p");
        cardDescription.textContent = card.text || "Sem descrição disponivel!";

        cardDetailElement.appendChild(cardImage);
        cardDetailElement.appendChild(cardName);
        cardDetailElement.appendChild(cardType);
        cardDetailElement.appendChild(cardDescription);

        cardDetails.appendChild(cardDetailElement);
    }

    async function searchPokemon() {
        const searchInput = document.getElementById("search-input").value.trim().toLowerCase();
        const errorMessageElement = document.getElementById("error-message");

        if (!searchInput) {
            errorMessageElement.textContent = "Insira um nome para pesquisar!";
            return;
        }
        try {
            const cards = await fetchPokemonCards();
            const filteredCards = cards.filter(card => card.name.toLowerCase().includes(searchInput));
            renderCards(filteredCards);
            errorMessageElement.textContent = ""; //Limpa a mensagem de erro
        } catch (error) {
            console.error("Error fetching cards:", error.message);
            errorMessageElement.textContent = error.message;
        }
    }

    async function filterPokemon() {
        const selectedType = document.getElementById("type-filter").value.toLowerCase();
        const errorMessageElement = document.getElementById("error-message");

        try {
            const cards = await fetchPokemonCards();
            let filteredCards;
            if (selectedType === "all types") {
                errorMessageElement.textContent = ""; 
                filteredCards = cards;
            } else {
                filteredCards = cards.filter(card => {
                    if (card.types && Array.isArray(card.types)) {
                        return card.types.map(type => type.toLowerCase()).includes(selectedType);
                    }
                    return false;
                });
            }
            renderCards(filteredCards);
            errorMessageElement.textContent = "";
        } catch (error) {
            console.error("Error fetching cards:", error.message);
            errorMessageElement.textContent = error.message;
        }
    }

    async function fetchAndRenderCards() {
        try {
            const cards = await fetchPokemonCards();
            renderCards(cards);
        } catch (error) {
            console.error("Error fetching cards:", error.message);
            cardContainer.innerHTML = `<p>${error.message}</p>`;
        }
    }

    fetchAndRenderCards();

    document.getElementById("search-button").addEventListener("click", searchPokemon);
    document.getElementById("filter-button").addEventListener("click", filterPokemon);
});