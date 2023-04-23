const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv').config();
const cors = require('cors');

const connectDB = require('./config/db');

const routes = require('./routes/recipes.routes');

connectDB();

const app = express();
app.use(express.json());
// app.use(morgan('dev'));
app.use(cors());

app.use("/recipe", routes);

module.exports = app;