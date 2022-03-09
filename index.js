require('dotenv').config();

const express = require('express');
const cors = require('cors');

const { dbConnection } = require('./database/config');

const app = express();

app.use(cors());

app.use(express.json())

dbConnection();

app.use('/api/users', require('./routes/users.route'));
app.use('/api/login', require('./routes/auth.route'));
app.use('/api/projects', require('./routes/projects.route'));
app.use('/api/cost-centers', require('./routes/cost-centers.route'));
app.use('/api/time-records', require('./routes/time-records.route'));
app.use('/api/uploads', require('./routes/uploads.route'));


app.use('/api', (req, res) => {
    res.json({ ok: true, message: 'Admin Pro API ok!' })
})


app.listen(process.env.PORT || 3000, () => { console.log(`Server in port ${process.env.PORT || 3000}!`); });