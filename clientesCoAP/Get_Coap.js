const coap = require('coap'); // Importa la biblioteca CoAP

const payload = JSON.stringify({
    name: 'sensor CoAP',
    type: 'temperature',
    location: 'Sala 1'
});

const req = coap.request({
    hostname: 'localhost',
    pathname: '/sensor',
    method: 'POST',
    confirmable: true
});

req.setOption('Content-Format', 'application/json'); // Indica que el payload es JSON

req.write(payload); // Envía el cuerpo de la petición

req.on('response', function (res) {
    let data = '';
    res.on('data', (chunk) => {
        data += chunk;
    });

    res.on('end', () => {
        try {
            const jsonData = JSON.parse(data);
            console.log('Sensor creado:');
            console.log(JSON.stringify(jsonData, null, 2));
        } catch (err) {
            console.error('Error al parsear la respuesta como JSON:', err.message);
        }
    });
});

req.end(); // Envía la petición