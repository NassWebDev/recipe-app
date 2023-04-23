const mongoose = require('mongoose');

const connectDB = (async () => {
    mongoose.set('strictQuery', false);
    mongoose.connect(process.env.DATABASE_URI).then(() => {
        console.log("MongoDB connecté");
    }).catch((err) => {
        onsole.log(err);
    })
});

module.exports = connectDB;