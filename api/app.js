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

    const errorMessages = {username: "", email: "", password: "", passwordConfirm: "",};

    for (const field in err.errors) {
        if (Object.prototype.hasOwnProperty.call(err.errors, field)) {
            const errorMessage = err.errors[field].message;
            const errorKey = err.errors[field].path;
            errorMessages[errorKey] = errorMessage;
        }
    }

    res.status(err.statusCode).json({
        status: err.status,
        message: errorMessages
    })
})

module.exports = app;