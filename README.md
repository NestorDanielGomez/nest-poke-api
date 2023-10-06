<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

## Ejecutar en modo desarrollo

1. Clonar repositorio
2. Ejecutar
3. ```bash
   npm install
   ```
4. Tener Nest CLI instalado

   ```bash
   npm i -g @nestjs/cli
   ```

5. Levantar la base de datos

   ```bash
   docker compose up -d
   ```

6. Clonar el archivo `.env.template` y renombrar por `.env`
7. Completar las variables de entorno en el archivo`.env`
8. ```bash
   npm run start:dev
   ```
9. Reconstruir la BD con la semilla (seed)

```
  http://localhost:3000/api/seed
```

## Generar Build de producción

1. Crear el archivo `.env.prod`
2. Cargar las variables de entorno de produccióm.
3. Construir la nueva imagen

```bash
  docker-compose -f docker-compose.prod.yaml --env-file .env.prod up --build
```

## Aplicacion desplegada

https://nestpokeapi.onrender.com/api/pokemon

- La Base de datos se desplego en Mongo Atlas

## Stack Utilizado

- NestJS
- MongoDb
- Docker

## Algunas Caracteristicas:

- Personalización de errores y códigos de error.

- Busqueda de pokemones por mongoId | numero | nombre.

- Uso de modelos en diferentes módulos.

- Paginación de resultados (query params: limit + offset).

- DTOs para Query parameters.

- Dockerizar la aplicación.
