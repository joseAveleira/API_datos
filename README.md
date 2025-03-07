# API de Sensores y Lecturas

Una API RESTful  PAara la asignatura de Seguridad de Datos en Red para gestionar sensores y sus lecturas de datos en tiempo real. Desarrollada con Node.js, Express y MongoDB.

## Descripción

Este proyecto implementa una API para administrar sensores IoT y almacenar sus lecturas. Permite registrar diferentes tipos de sensores (temperatura, humedad, CO2, energía), guardar sus mediciones y realizar consultas por diferentes criterios.

## Tecnologías utilizadas

- **Node.js**: Entorno de ejecución para JavaScript del lado del servidor
- **Express**: Framework web para crear API REST
- **MongoDB**: Base de datos NoSQL para almacenamiento de datos
- **Mongoose**: ODM para MongoDB
- **Cors**: Middleware para permitir peticiones de diferentes orígenes
- **Body-Parser**: Middleware para procesar datos en peticiones HTTP

## Estructura del proyecto

## Endpoints de la API

### Sensores

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/sensors` | Obtener todos los sensores |
| GET | `/sensors/:id` | Obtener un sensor por su ID |
| POST | `/sensors` | Crear un nuevo sensor |
| PUT | `/sensors/:id` | Actualizar un sensor existente |
| DELETE | `/sensors/:id` | Eliminar un sensor |

### Lecturas

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/readings/:sensorId` | Obtener todas las lecturas de un sensor |
| GET | `/readings/time/:sensorId` | Obtener lecturas de un sensor por rango de fechas |
| POST | `/readings` | Crear una nueva lectura |
| DELETE | `/readings/:sensorId` | Eliminar todas las lecturas de un sensor |

## Ruta de prueba

La API incluye una ruta de prueba para verificar que el servicio está funcionando correctamente:
