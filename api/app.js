const express = require('express');
const dotenv = require('dotenv').config();
const cors = require('cors');
const AppError = require('./utils/appError');

const connectDB = require('./config/db');

const recipesRoutes = require('./routes/recipes.routes');
const authRoutes = require('./routes/auth.routes');
const usersRoutes = require('./routes/users.routes');
const authController = require('./controllers/auth.controller');

connectDB();

const app = express();
app.use(express.json());
app.use(cors());

app.use("/auth", authRoutes);
app.use("/users", usersRoutes);

app.use(authController.protect)

app.use("/recipes", recipesRoutes);

app.all("*", (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
})

app.use((err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';

    res.status(err.statusCode).json({
        status: err.status,
        message: err.message
    })
})

module.exports = app;