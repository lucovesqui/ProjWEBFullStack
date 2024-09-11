const express = require('express');
const { searchCards } = require('../controllers/cardController');
const { addCard } = require('../controllers/cardController');
const verifyToken = require('../controllers/authMiddleware');
const router = express.Router();

router.get('/cards', verifyToken, searchCards);
router.post('/cards', verifyToken, addCard);

module.exports = router;