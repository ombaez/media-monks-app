# Media-monks App

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
