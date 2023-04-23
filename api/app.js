const express = require('express');
const dotenv = require('dotenv').config();
const cors = require('cors');

const connectDB = require('./config/db');

const routes = require('./routes/recipes.routes');

connectDB();

const app = express();
app.use(express.json());
app.use(cors());

app.use("/", routes);

module.exports = app;