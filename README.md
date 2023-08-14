<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

# Ejecutar en desarrollo

1. Clonar el repositorio
2. Ejecutar
```
npm install
```
3. Tener Nest CLI instalado
```
npm i -g @nestjs/cli
```

4. Levantar aplicación
```
docker-compose up -d
```

5. Cargar aplicacion
```
http://localhost:3000
```

6. Al iniciar la aplicación carga por defecto 1 subasta en curso con monto 0.

7. El Workflow ID indica el estado de la oferta, para ver el estado actual/final se puede consultar el siguiente endpoint:
```
curl --location --request GET 'localhost:3000/workflow/{workflowId}'
```

## Stack usado
* MongoDB
* Kafka
* Nest
* Redis

