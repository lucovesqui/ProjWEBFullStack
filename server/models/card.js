const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
    name: { type: String, required: true },
    set: { type: String, required: true },
    rarity: { type: String, required: true },
    type: { type: String, required: true }
});

module.exports = mongoose.model('card', cardSchema);