const express = require('express');
    require('dotenv').config();

const app = require('./app');

const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log(`Running on port ${port}...`);
})