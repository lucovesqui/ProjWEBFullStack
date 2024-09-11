import React, { useState } from 'react';
import axios from 'axios';

const cartasPag = () => {
  
  const [searchName, setSearchName] = useState('');
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  
  const [name, setName] = useState('');
  const [set, setSet] = useState('');
  const [rarity, setRarity] = useState('');
  const [type, setType] = useState('');
  const [message, setMessage] = useState('');

  
  const handleSearch = async () => {
    if (!searchName.trim()) {  
        setError('Por favor, insira o nome da carta para buscar.');
        return;
    }

    console.log('Iniciando a busca de cartas...');
    setLoading(true);
    setError(null);
    const token = localStorage.getItem('token');  
    if (!token) {
      setError('Usuário não autenticado');
      setLoading(false); 
      return;
    }

    try {
      const response = await axios.get('http://localhost:5000/api/cards', {
        headers: { Authorization: `Bearer ${token}` },
        params: { q: searchName }
      });
      setCards(response.data);  
    } catch (err) {
      console.error('Erro ao buscar cartas:', err.response || err);
      setError('Erro ao buscar cartas. Tente novamente.');
    } finally {
      setLoading(false);
    }
};

  
  const handleAddCard = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');  
    if (!token) {
      setMessage('Usuário não autenticado.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/cards', 
        { name, set, rarity, type },  
        { headers: { Authorization: `Bearer ${token}` } }  
      );
      setMessage('Carta adicionada com sucesso!');
      setName('');
      setSet('');
      setRarity('');
      setType('');
    } catch (error) {
      console.error('Erro ao adicionar carta:', error);
      setMessage('Erro ao adicionar carta. Tente novamente.');
    }
  };

  return (
    <div>
      <h2>POKEMON TCG</h2>

      <div style={{ marginBottom: '20px' }}>
        <h3>Buscar Cartas</h3>
        <input
          type="text"
          placeholder="Digite o nome da carta"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
        />
        <button onClick={handleSearch} disabled={loading}>
          {loading ? 'Buscando...' : 'Buscar'}
        </button>

        {error && <p style={{ color: 'red' }}>{error}</p>} 

        <ul>
          {cards.map((card) => (
            <li key={card._id}>
              <p><strong>{card.name}</strong></p>
              <p>Set: {card.set}</p>
              <p>Raridade: {card.rarity}</p>
              <p>Tipo: {card.type}</p>
            </li>
          ))}
        </ul>
      </div>

      
      <div>
        <h3>Adicionar Nova Carta</h3>
        {message && <p>{message}</p>}  

        <form onSubmit={handleAddCard}>
          <div>
            <label>Nome:</label>
            <input 
              type="text" 
              value={name}
              onChange={(e) => setName(e.target.value)} 
              required 
            />
          </div>
          <div>
            <label>Set:</label>
            <input 
              type="text" 
              value={set}
              onChange={(e) => setSet(e.target.value)} 
              required 
            />
          </div>
          <div>
            <label>Raridade:</label>
            <input 
              type="text" 
              value={rarity}
              onChange={(e) => setRarity(e.target.value)} 
              required 
            />
          </div>
          <div>
            <label>Tipo:</label>
            <input 
              type="text" 
              value={type}
              onChange={(e) => setType(e.target.value)} 
              required 
            />
          </div>
          <button type="submit">Adicionar</button>
        </form>
      </div>
    </div>
  );
};

export default cartasPag;