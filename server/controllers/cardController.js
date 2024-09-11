const Card = require('../models/card');
const redisClient = require('../redisclient');

exports.searchCards = async (req, res) => {
    const { q } = req.query;
    if (!q) {
        return res.status(400).json({ message: 'Parâmetro de busca ausente' });
    }

    try {
        console.log(`Buscando cartas no cache com o parâmetro: ${q}`);
        const cachedCards = await redisClient.get(q);
        if (cachedCards) {
            console.log('Cartas encontradas no cache.');
            return res.status(200).json(JSON.parse(cachedCards));  
        }

        console.log('Buscando cartas no banco de dados...');
    
        const cards = await Card.find({ name: new RegExp(q, 'i') });

        await redisClient.setEx(q, 3600, JSON.stringify(cards));

        res.status(200).json(cards);
    } catch (error) {
        console.error('Erro ao buscar cartas:', error);  
        res.status(500).json({ message: 'Erro ao buscar cartas no servidor.' });
    }
};


exports.addCard = async (req, res) => {
    const { name, set, rarity, type } = req.body;

    if (!name || !set || !rarity || !type) {
        return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
    }

    try {
        const newCard = new Card({ name, set, rarity, type });
        await newCard.save();
        await redisClient.del(name);
        res.status(201).json(newCard);
    } catch (error) {
        console.error('Erro ao salvar a carta no banco de dados:', error);
        res.status(500).json({ message: 'Erro ao adicionar carta.' });
    }
};

