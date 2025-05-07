const coap = require('coap'); // Importa la biblioteca CoAP

const req = coap.request({
    hostname: 'localhost',
    pathname: '/sensor',
    method: 'DELETE',
    confirmable: true,
    query: 'id=65f8a3b4c9d8e01234567891'
});

req.on('response', function (res) {
    let data = '';
    res.on('data', (chunk) => {
        data += chunk;
    });

    res.on('end', () => {
        try {
            const jsonData = JSON.parse(data);
            console.log('Respuesta del servidor:');
            console.log(JSON.stringify(jsonData, null, 2));
        } catch (err) {
            console.error('Error al parsear la respuesta como JSON:', err.message);
        }
    });
});

req.end(); // Envía la petición
