require('dotenv').config();
const mongoose = require('mongoose');
console.log('MONGO_CREDENTIALS:', process.env.MONGO_CREDENTIALS);
const MONGO_URI = process.env.MONGO_CREDENTIALS || "mongodb://localhost:27017/sensores";

const connectDB = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log('Conexión a MongoDB establecida');
    } catch (err) {
        console.error('Error al conectar a MongoDB:', err);
        process.exit(1);
    }
};

module.exports = connectDB;
