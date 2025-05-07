const coap = require('coap')
const url = require('url')

const Sensor = require('../models/Sensor') 

function init() {
  const server = coap.createServer()

  server.on('request', async (req, res) => {
    const urlParts = url.parse(req.url, true)
    const path = urlParts.pathname
    const method = req.method
    const query = urlParts.query

    if (path === '/sensor' && method === 'GET') {
      const sensorId = query.id

      if (!sensorId) {
        res.code = '4.00' // Bad Request
        res.end(JSON.stringify({ error: 'ID de sensor no proporcionado' }))
        return
      }

      try {
        const sensor = await Sensor.findById(sensorId).exec()

        if (!sensor) {
          res.code = '4.04' // Not Found
          res.end(JSON.stringify({ error: 'Sensor no encontrado' }))
          return
        }

        res.end(JSON.stringify(sensor))
      } catch (err) {
        res.code = '5.00' // Internal Server Error
        res.end(JSON.stringify({
          errorGenerado: 'Error al buscar el sensor',
          error: err.message
        }))
      }
    }if (path === '/sensor' && method === 'POST') {
      let payload = ''

      req.on('data', chunk => {
        payload += chunk
      })

      req.on('end', async () => {
        try {
          const data = JSON.parse(payload)

          const { name, type, location } = data

          const sensor = new Sensor({ name, type, location })
          await sensor.save()

          res.code = '2.01' // Created
          res.end(JSON.stringify(sensor))
        } catch (err) {
          res.code = '5.00'
          res.end(JSON.stringify({
            error: 'Error al crear el sensor',
            message: err.message
          }))
        }
      })
    }if (path === '/sensor' && method === 'PUT') {
      const sensorId = query.id;
    
      if (!sensorId) {
        res.code = '4.00'; // Bad Request
        res.end(JSON.stringify({ error: 'ID de sensor no proporcionado' }));
        return;
      }
    
      let payload = '';
    
      req.on('data', chunk => {
        payload += chunk;
      });
    
      req.on('end', async () => {
        try {
          const data = JSON.parse(payload);
    
          const updatedSensor = await Sensor.findByIdAndUpdate(sensorId, data, {
            new: true,
            runValidators: true
          }).exec();
    
          if (!updatedSensor) {
            res.code = '4.04'; // Not Found
            res.end(JSON.stringify({ error: 'Sensor no encontrado' }));
            return;
          }
    
          res.code = '2.04'; // Changed
          res.end(JSON.stringify(updatedSensor));
        } catch (err) {
          res.code = '5.00'; // Internal Server Error
          res.end(JSON.stringify({
            error: 'Error al actualizar el sensor',
            message: err.message
          }));
        }
      });
    }if (path === '/sensor' && method === 'DELETE') {
      const sensorId = query.id;
    
      if (!sensorId) {
        res.code = '4.00'; // Bad Request
        res.end(JSON.stringify({ error: 'ID de sensor no proporcionado' }));
        return;
      }
    
      try {
        const deletedSensor = await Sensor.findByIdAndDelete(sensorId).exec();
    
        if (!deletedSensor) {
          res.code = '4.04'; // Not Found
          res.end(JSON.stringify({ error: 'Sensor no encontrado' }));
          return;
        }
    
        res.code = '2.02'; // Deleted
        res.end(JSON.stringify({ message: 'Sensor eliminado correctamente' }));
      } catch (err) {
        res.code = '5.00'; // Internal Server Error
        res.end(JSON.stringify({
          error: 'Error al eliminar el sensor',
          message: err.message
        }));
      }
    }if (path === '/obs') {
      // Si NO es una petición Observe (solo quiere los datos una vez)
      if (req.headers.Observe !== 0) {
        const data = {
          temperature: Math.floor(Math.random() * 41),
          humidity: Math.floor(Math.random() * 91) + 10
        };
        return res.end(JSON.stringify(data));
      }
    
      // Si es una suscripción Observe, enviamos datos periódicos
      const interval = setInterval(() => {
        const data = {
          temperature: Math.floor(Math.random() * 41),
          humidity: Math.floor(Math.random() * 91) + 10
        };
        res.write(JSON.stringify(data));
      }, 1000); // cada segundo
    
      // Limpiar el intervalo cuando el cliente deja de observar
      res.on('finish', () => {
        clearInterval(interval);
      });
    }else {
      res.code = '4.04'
      res.end('Ruta desconocida\n')
    }
  })

  server.listen(() => {
    console.log('Servidor CoAP iniciado en el puerto', server._sock.address().port)
  })
}

module.exports = { init }
