const aedes = require('aedes')();
const net = require('net');
const http = require('http');
const WebSocket = require('ws');

const mqttPort = 1883;
const wsPort = 8888;

const MqttServer = net.createServer(aedes.handle);
const httpServer = http.createServer();

// Configurar el servidor WebSocket para trabajar con Aedes
const WsServer = new WebSocket.Server({ server: httpServer });

// Manejar conexiones WebSocket y redirigirlas a Aedes
WsServer.on('connection', (ws) => {
    const stream = WebSocket.createWebSocketStream(ws);
    aedes.handle(stream);
});

// Mostrar por consola cada vez que se publica un mensaje
aedes.on('publish', function (packet, client) {
    if (client) {
        console.log(' - Message Published: ', packet.topic);
    }
});

// Mostrar por consola cada vez que se desconecta un cliente
aedes.on('clientDisconnect', function (client) {
    console.log(' - Client Disconnected: ', client.id);
});

// Mostrar por consola cada vez que se conecta un cliente
aedes.on('client', function (client) {
    console.log(' - New Client: ', client.id);
});

// Mostrar por consola cada vez que se suscribe un cliente
aedes.on('subscribe', function (subscriptions, client) {
    console.log(' - Client Subscribed:', subscriptions);
});

// Función para iniciar el broker MQTT
const startBroker = function () {
    MqttServer.listen(mqttPort, function () {
        console.log('Servidor MQTT en el puerto', mqttPort);
    });
    httpServer.listen(wsPort, () => {
        console.log('Servidor WebSocket en el puerto', wsPort);
    });
};

// Función para publicar mensajes
const publish = function (topic, message) {
    aedes.publish({ topic: topic, payload: message });
};

// Función para suscribirse a tópicos
const subscribe = function (topic) {
    aedes.subscribe(topic, function () {
        console.log(' - Client suscribed to:', topic);
    });
};

// Exportar las funciones directamente en el objeto
module.exports = {
    startBroker,
    publish,
    subscribe
};
