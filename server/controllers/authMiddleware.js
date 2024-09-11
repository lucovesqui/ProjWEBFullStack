const jwt = require('jsonwebtoken');
const logger = require('../controllers/logger');

const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) {
        logger.error('Token não fornecido.');
        return res.status(403).json({ message: 'Token não fornecido.' });
    }

    const tokenWithoutBearer = token.startsWith('Bearer ') ? token.slice(7, token.length) : token;

    jwt.verify(tokenWithoutBearer, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            logger.error('Falha ao autenticar token.');
            return res.status(500).json({ message: 'Falha ao autenticar token.' });
        }
        req.userId = decoded.userId;
        next();
    });
};

module.exports = verifyToken;