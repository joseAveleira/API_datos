const express = require('express');
require('dotenv').config();
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const sensorRoutes = require('./routes/sensors.routes');
const readingRoutes = require('./routes/readings.routes');
const authRoutes = require('./routes/auth.routes');
const mqttBroker = require('./services/broker');
const coapServer = require('./services/coapServer')

const app = express();
const port = 3000;

// Conectar a la base de datos
connectDB();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

// Rutas
app.use('/sensors', sensorRoutes);
app.use('/readings', readingRoutes);
app.use('/auth', authRoutes);

// Ruta de prueba
app.get('/test', (req, res) => res.json({ msg: 'El API REST funciona!' }));

// Iniciar servidor
mqttBroker.startBroker();
coapServer.init();
app.listen(port, () => console.log(`Servidor corriendo en el puerto ${port}`));
