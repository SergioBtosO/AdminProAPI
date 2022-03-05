require('dotenv').config();

const express = require('express');
const cors = require('cors');

const { dbConnection } = require('./database/config');

const app = express();

dbConnection();

app.use(cors());
app.get('/', (req, res) => {
    res.json({ ok: true, message: 'Admin Pro API ok!' });
});


app.listen(process.env.PORT || 3000, () => { console.log(`Server in port ${process.env.PORT || 3000}!`); });