const redis = require('redis');

const redisClient = redis.createClient();

redisClient.on('error', (err) => {
    console.error('Erro ao conectar ao Redis:', err);
});

redisClient.on('connect', () => {
    console.log('Conectado ao Redis');
});

module.exports = redisClient;