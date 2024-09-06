# 🚀 **AWS COGNITO AUTHENTICATION API** 🚀
_A simple API for authentication using AWS Cognito._

[![Build Status](https://img.shields.io/github/workflow/status/your-repo/your-project/CI?style=for-the-badge)](https://github.com/your-repo/your-project/actions)
[![License](https://img.shields.io/github/license/your-repo/your-project?style=for-the-badge)](https://github.com/your-repo/your-project/blob/main/LICENSE)
![Node.js](https://img.shields.io/badge/Node.js-v20+-green?style=for-the-badge&logo=node.js)
![Express.js](https://img.shields.io/badge/Express.js-4.x-lightgrey?style=for-the-badge&logo=express)
![AWS Cognito](https://img.shields.io/badge/AWS%20Cognito-%23FF9900?style=for-the-badge&logo=amazon-aws)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-yellow?style=for-the-badge&logo=javascript)
![npm](https://img.shields.io/badge/npm-9.x-red?style=for-the-badge&logo=npm)
![Git](https://img.shields.io/badge/Git-%23F05033?style=for-the-badge&logo=git&logoColor=white)

Este proyecto es una API simple basada en Express que implementa autenticación de usuarios con **AWS Cognito**. Incluye funcionalidades para iniciar sesión, cambiar la contraseña, restablecer la contraseña y manejar el flujo de **newPasswordRequired** automáticamente con una contraseña predeterminada.

## Características

- Inicio de sesión utilizando **AWS Cognito**.
- Manejo automático del flujo de "nueva contraseña requerida".
- Cambio de contraseña.
- Restablecimiento de contraseña.
- Configuración y manejo de credenciales mediante variables de entorno (`.env`).

## Requisitos

- Node.js v12 o superior.
- AWS Cognito configurado con un **User Pool** y un **App Client**.
- **npm** (Node Package Manager).

## Instalación

1. Clona el repositorio en tu máquina local:

    ```bash
    git clone https://github.com/tu_usuario/tu_repositorio.git
    cd tu_repositorio
    ```

2. Instala las dependencias:

    ```bash
    npm install
    ```

3. Crea un archivo `.env` en el directorio raíz con las siguientes variables:

    ```plaintext
    COGNITO_USER_POOL_ID=us-east-1_#########
    COGNITO_CLIENT_ID=#########################
    AWS_REGION=us-east-1
    PORT=####
    ```

   Asegúrate de cambiar los valores de `COGNITO_USER_POOL_ID` y `COGNITO_CLIENT_ID` por los tuyos correspondientes.

## Uso

1. Ejecuta la aplicación localmente:

    ```bash
    npm run dev
    ```

   La API estará corriendo en el puerto `3000` de manera predeterminada.

2. Rutas disponibles:

    - **POST** `/login`: Iniciar sesión en AWS Cognito.
    - **POST** `/change-password`: Cambiar la contraseña del usuario autenticado.
    - **POST** `/forgot-password`: Enviar código de verificación para restablecer la contraseña.
    - **POST** `/confirm-forgot-password`: Confirmar el restablecimiento de contraseña.
    - **POST** `/confirm-new-password`: Confirmar el cambio de contraseña cuando se requiere una nueva.

## Ejemplos de Peticiones

### Login

```bash
curl -X POST http://localhost:3000/login -H "Content-Type: application/json" -d '{
  "username": "user@example.com",
  "password": "Password123!"
}'
```

```bash
curl -X POST http://localhost:3000/change-password -H "Content-Type: application/json" -d '{
  "accessToken": "tu-access-token",
  "previousPassword": "Password123!",
  "proposedPassword": "Password456!"
}'
```

```plaintext
.
├── config
│   └── awsConfig.js          # Configuración de AWS
├── controllers
│   └── authController.js      # Lógica de autenticación
├── routes
│   └── authRoutes.js          # Definición de rutas
├── app.js                     # Configuración y servidor Express
├── package.json               # Dependencias y configuración del proyecto
└── README.md                  # Documentación del proyecto
```

## Variables de Entorno

* `COGNITO_USER_POOL_ID:` El User Pool ID de AWS Cognito.
* `COGNITO_CLIENT_ID:` El Client ID de tu aplicación en AWS Cognito.
* `AWS_REGION:` La región donde está configurado tu User Pool.

## Contribuciones

_¡Las contribuciones son bienvenidas! Si deseas colaborar, abre un issue o realiza un pull request._


## Licencia

Este proyecto está bajo la licencia MIT. Consulta el archivo `LICENSE` para obtener más información.

### Explicación:
1. **Instalación y Uso**: Explica cómo instalar las dependencias, configurar las variables de entorno y ejecutar el proyecto.
2. **Estructura del Proyecto**: Muestra la estructura básica para entender dónde están los archivos clave.
3. **Ejemplos de Peticiones**: Proporciona ejemplos simples para interactuar con la API.
4. **Contribuciones y Licencia**: Informa cómo otros pueden contribuir al proyecto y cuál es la licencia.

