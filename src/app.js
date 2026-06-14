const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const errorHandler = require('./middlewares/errorHandler');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/auth', authRoutes);

app.use((req, res) => {
    res.status(404).json({ message: 'Rota nao encontrada' });
});

app.use(errorHandler);

module.exports = app;
