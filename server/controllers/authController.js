const validator = require('validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

exports.login = async (req, res) => {
    const { username, password } = req.body;

    if (!validator.isAlphanumeric(username)) {
        return res.status(400).json({ message: 'Nome de usuário inválido' });
    }

    const user = await User.findOne({ username });
    if (!user) {
        return res.status(401).json({ message: 'Usuário não encontrado' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(401).json({ message: 'Senha inválida' });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
};