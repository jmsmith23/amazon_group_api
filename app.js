const express = require('express');
const jsxEngine = require('jsx-view-engine');
const morgan = require('morgan');
const userRoutes = require('./routes/userRoutes');
const app = express();

app.set('view engine', 'jsx');
app.engine('jsx', jsxEngine());

app.use(express.static('public/css'));
app.use(express.json());
app.use(morgan('combined'));
app.use('/users', userRoutes);

module.exports = app;
