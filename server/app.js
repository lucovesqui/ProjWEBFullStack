require('dotenv').config(); 
const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const cardRoutes = require('./routes/cardRoutes');
const cors = require('cors');
const compression = require('compression');

const app = express();

app.use(cors());
app.use(express.json());
app.use(compression());


app.use('/api/auth', authRoutes);
app.use('/api', cardRoutes);


mongoose.connect(process.env.MONGO_URI, {
    maxPoolSize: 10,  
}).then(() => {
    console.log('Conectado ao MongoDB');
}).catch((err) => {
    console.error('Erro ao conectar ao MongoDB:', err);
});

module.exports = app;