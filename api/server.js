const express = require('express');
const dotenv = require('dotenv').config();

const app = require('./app');

const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log(`Running on port ${port}...`);
})