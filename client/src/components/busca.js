import React, { useState } from 'react';
import { searchCards } from '../services/api';

const SearchCards = () => {
    const [name, setName] = useState('');
    const [cards, setCards] = useState([]);

    const handleSearch = async () => {
        const result = await searchCards(name);
        setCards(result);
    };

    return (
        <div>
            <h2>Buscar Cartas</h2>
            <input 
                type="text" 
                placeholder="Nome da Carta" 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
            />
            <button onClick={handleSearch}>Buscar</button>

            <ul>
                {cards.map(card => (
                    <li key={card._id}>{card.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default BuscaCards;