import React, { useState } from 'react';
import { addCard } from '../services/api';

const AddCard = () => {
    const [name, setName] = useState('');
    const [set, setSet] = useState('');
    const [rarity, setRarity] = useState('');
    const [type, setType] = useState('');

    const handleAddCard = async () => {
        const cardData = { name, set, rarity, type };
        const result = await addCard(cardData);
        console.log(result);
    };

    return (
        <div>
            <h2>Adicionar Carta</h2>
            <input 
                type="text" 
                placeholder="Nome" 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
            />
            <input 
                type="text" 
                placeholder="Set" 
                value={set} 
                onChange={(e) => setSet(e.target.value)} 
            />
            <input 
                type="text" 
                placeholder="Raridade" 
                value={rarity} 
                onChange={(e) => setRarity(e.target.value)} 
            />
            <input 
                type="text" 
                placeholder="Tipo" 
                value={type} 
                onChange={(e) => setType(e.target.value)} 
            />
            <button onClick={handleAddCard}>Adicionar</button>
        </div>
    );
};

export default insere;