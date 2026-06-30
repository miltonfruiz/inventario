# Sistema de Inventario para Pequeño Negocio
=============================================

## Descripción
El sistema de inventario es una aplicación diseñada para ayudar a pequeños negocios a gestionar sus existencias de manera eficiente. Permite a los usuarios registrar, actualizar y eliminar productos, así como realizar búsquedas y generación de informes.

## Stack Tecnológico
* **Backend**: Node.js con Express.js
* **Base de datos**: MongoDB
* **Frontend**: React.js (opcional)
* **Autenticación**: JSON Web Tokens (JWT)

## Instalación
1. Clonar el repositorio: `git clone https://github.com/usuario/repo.git`
2. Instalar dependencias: `npm install`
3. Iniciar la aplicación: `npm start`

## Docker
La aplicación se puede ejecutar utilizando Docker. Para hacerlo, sigue estos pasos:
1. Construir la imagen: `docker build -t sistema-inventario .`
2. Ejecutar el contenedor: `docker run -p 3000:3000 sistema-inventario`

## Endpoints
### Autenticación
* **POST /login**: Iniciar sesión
* **POST /register**: Registrarse
* **GET /profile**: Obtener perfil de usuario

### Productos
* **GET /products**: Obtener lista de productos
* **GET /products/:id**: Obtener producto por ID
* **POST /products**: Crear producto
* **PUT /products/:id**: Actualizar producto
* **DELETE /products/:id**: Eliminar producto

### Informes
* **GET /reports**: Obtener informes de ventas

## Seguridad
* **Autenticación**: La aplicación utiliza JSON Web Tokens (JWT) para autenticar a los usuarios.
* **Autorización**: La aplicación utiliza roles para autorizar acceso a determinados endpoints.
* **Cifrado**: La aplicación utiliza HTTPS para cifrar la comunicación entre el cliente y el servidor.

## Contribuir
Para contribuir al proyecto, por favor sigue los siguientes pasos:
1. Clonar el repositorio
2. Crear una rama para tu contribución
3. Realizar los cambios y commits necesarios
4. Realizar un pull request para que se revise tu contribución

## Licencia
El sistema de inventario es software libre y de código abierto, licenciado bajo la licencia MIT.