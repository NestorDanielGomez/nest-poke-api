<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

## Ejecutar en desarrollo

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

docker compose up -d

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

<!--
## Installation

```bash
$ npm install
````

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).

Personalizar errores y codigos de error

buscar pokemon por mongoId, por numero o por nombre

---

Uso de modelos en diferentes módulos

SEED para llenar la base de datos

Paginación de resultados

DTOs para Query parameters

Transformaciones de DTOs

---------Dockerizacion

Mongo Atlas

Env file

joi

Validation Schemas

Configuration Module

Recomendaciones para un Readme útil

Despliegues

Dockerfile -->
