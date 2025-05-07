const coap = require('coap'); // Importa la biblioteca CoAP

const payload = JSON.stringify({
    name: 'MODIFICADO CoAP'
});

const req = coap.request({
    hostname: 'localhost',
    pathname: '/sensor',
    method: 'PUT',
    confirmable: true,
    query: 'id=65f8a3b4c9d8e01234567891'
});

req.setOption('Content-Format', 'application/json'); // Indicamos que el contenido es JSON

req.write(payload); // Enviamos el cuerpo con los datos a modificar

req.on('response', function (res) {
    let data = '';
    res.on('data', (chunk) => {
        data += chunk;
    });

    res.on('end', () => {
        try {
            const jsonData = JSON.parse(data);
            console.log('Sensor actualizado:');
            console.log(JSON.stringify(jsonData, null, 2));
        } catch (err) {
            console.error('Error al parsear la respuesta como JSON:', err.message);
        }
    });
});

req.end(); // Enviamos la petición