# Media monks App

Para correr la aplicacion, ejecute posicionado en la carpeta del proyecto:

```
docker-compose build
```

Este comando realizara un build (descarga imagenes de Node y Redis) de los 3 servicios listados dentro del docker-compose. Los 3 servicios refieren a:

- Store de key-values en redis.
- Api - BE(HTTP + Sockets) en Nodejs y FE en HTML, CSS, JS
- Tests (solo del BE)

Luego de haber hecho el build, ejecute:

```
docker-compose up
```

Este comando levantara containers con las imagenes detalladas en el docker-compose, permitira la conexion entre servicios, expone puertos.

Para verificar que los servicios esten OK, se muestra en la terminal las siguientes leyendas:

**Listening on port 3000 for Express-WS-Redis-Server** --> Confirma el servidor http + sockets.

**Redis client connected** --> Confirma que el cliente que almacena las key-values esta conectado.

**Testing**--> Esta dividido en 2 partes. Server tests y socket tests

Se puede correr independientemente los tests, luego de haber hecho el build, ejecutando:

```
docker-compose up test
```

**LOGS**

```
api_test |   Test connections
api_test |     ✓ Check Redis connection - Hello World - Key Value (14 ms)
api_test |     ✓ Api test endpoint must return confirm message (148 ms)
api_test |   Tests data with responses
api_test |     ✓ Should response with 404 when not found results (20 ms)
api_test |     ✓ Should response value (20 ms)
```

```
api_test |   Sockets connections test
api_test |     ✓ Connection with sockets must return pong (44 ms)
api_test |     ✓ No connection must return not exist (6 ms)
api_test |   Socket confirm message test
api_test |     ✓ Send values and await for confirm event (4 ms)

```

## Funcionamiento

La aplicacion se expone en el puerto 3000, mediante un front basico con un formulario para tomar key-values y mediante el envio del formulario, salvar estos datos en Redis. Mostrara un cartel de confirmación.

URL entrada : http://localhost:3000

Ejemplo:

Se envian datos como:

Key: media
Value: monks

URL consulta (HTTP): http://localhost:3000/value/{{key}}

Ejemplo:

Consulta el valor de la key:

http://localhost:3000/value/media

Responses:

HTTP Code: 200

```
{
  "value": "monks"
}
```

En caso de no encontrar valores, se devuelve:

HTTP Code: 404

```
{
  "value": null
}
```

Para simular una caida del servicio, se puede ejecutar el comando:

```
docker-compose stop
```

Este comando detiene cada servicio pero no elimina los containers, lo cual es importante para simluar una caida del servicio pero no del servicio en donde se persisten los datos (Redis).
Luego levantar nuevamente los servicios y consultar el valor que fue guardado para constatar que ante una caida de servicio la informacion siga persistiendo.
