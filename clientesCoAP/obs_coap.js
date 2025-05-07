const coap = require('coap'); // Importa la biblioteca CoAP

const req = coap.request({
  hostname: 'localhost',
  pathname: '/obs',
  observe: true,
  method: 'GET'
});

req.on('response', (res) => {
  console.log('Cliente suscrito a /obs\n');

  res.on('data', (chunk) => {
    try {
      const data = JSON.parse(chunk.toString());
      console.log(`Temperatura: ${data.temperature} °C, Humedad: ${data.humidity} %`);
    } catch (err) {
      console.error('Error al parsear los datos:', err.message);
    }
  });

  res.on('end', () => {
    console.log('Fin de la suscripción');
  });
});

req.end(); // Envía la solicitud
