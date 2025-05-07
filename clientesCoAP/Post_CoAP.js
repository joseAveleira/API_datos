const coap = require('coap'); // Importa la biblioteca CoAP

const req = coap.request({
    hostname: 'localhost',
    pathname: '/sensor?id=65f8a3b4c9d8e01234567891',
    method: 'GET',
    // token: Buffer.from('tokenUsuario'), // Probar a mostrar el token en el servidor
}); // Crea una petición GET a 'localhost/devices'

// req.setOption('Block2', Buffer.of(0x0))

req.on('response', function (res) { // Escucha el evento 'response'
    let data = '';
    res.on('data', (chunk) => {
        data += chunk; // Acumula los datos recibidos
    });

    res.on('end', () => {
        try {
            const jsonData = JSON.parse(data); // Convierte la respuesta en un objeto JSON
            console.log(JSON.stringify(jsonData, null, 2)); // Muestra el JSON formateado
        } catch (err) {
            console.error('Error al parsear la respuesta como JSON:', err.message);
        }
    });
});

req.end(); // Envía la petición
