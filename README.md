# VALTX Reto Backend

Backend con NestJS + TypeORM + SQL Server
API REST modular, segura y protegida con JWT para gestión de productos e imágenes.

---

## Características

- **Arquitectura modular**: módulos separados para Auth, Products e Images  
- **CRUD** de Productos e Imágenes (URL y subida de archivos)  
- **Autenticación y autorización** con JWT y Passport  
- **TypeORM** con SQL Server (sincronización automática de entidades en desarrollo)  
- **Principios SOLID y Clean Architecture**  
- **Swagger** (OpenAPI) en `/api/docs`  
- **Seguridad**: Helmet, rate‑limit, CORS  

---

## Instalación y puesta en marcha

### 1. Clona el repositorio

```bash
git clone https://github.com/VALTX-RETO/valtx-reto-backend.git

cd valtx-reto-backend

npm install
```

### 2. Crea .env en base al .env.template y reemplaza tus credenciales
```bash 
PORT=3000

DB_HOST=localhost
DB_PORT=1433
DB_USER=tu_usuario
DB_PASS=tu_contraseña
DB_NAME=DBVALTX
DB_TRUST_CERT=true

JWT_SECRET=tu_clave_supersecreta

```

### 3. Crea la base de datos
```bash
CREATE DATABASE DBVALTX;
```

## 4. En la terminal, apuntando a tu proyecto, ejecuta en desarrollo
```bash 
npm run start:dev
```


## APIS DISPONIBLES
## Endpoints y URLs
```bash 
- *Registrar usuario*  
  `POST http://localhost:3000/api/auth/register`
  * Crear una contraseña fuerte, por ejemplo: Boris@2025

- *Login*
  `POST http://localhost:3000/api/auth/login`

- *Listar productos* 
  `GET http://localhost:3000/api/products`

- *Obtener producto por ID*
  `GET http://localhost:3000/api/products/{id}`

- *Crear producto*
  `POST http://localhost:3000/api/products`

- *Actualizar producto*
  `PUT http://localhost:3000/api/products/{id}`

- *Eliminar producto*
  `DELETE http://localhost:3000/api/products/{id}`

- *Subir imagen*
  `POST http://localhost:3000/api/products/{id}/images`

- *Listar imágenes*
  `GET http://localhost:3000/api/products/{id}/images`

- *Swagger UI*
  `GET http://localhost:3000/api`
```