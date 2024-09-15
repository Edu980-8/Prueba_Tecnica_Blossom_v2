
---

# 🚀 Rick & Morty API - GraphQL, Express, Redis, and React Frontend

Frontend Funcionando: Homepage 👍
![image](https://github.com/user-attachments/assets/fc50ae46-fc31-4b14-8e6d-01f844861877)

Frontend Funcionando: Details Section 👍
![image](https://github.com/user-attachments/assets/0c0b1c96-c9f0-463e-9763-90324b205f66)

Backend leyendo las queries de GraphQL 👍
![image](https://github.com/user-attachments/assets/978557ab-bf24-499c-893a-c44f5cfb572d)

Backend y frontend ejecutandose en desarrollo 😊
![image](https://github.com/user-attachments/assets/84582d22-4353-408f-a6d4-9d2a6b257dda)

Filtros funcionando (Hombre, vivo, humano y con Smith dentro de su nombre)
![image](https://github.com/user-attachments/assets/0ad195f0-3926-4119-874c-582746ff1b54)

Modelo de base de datos
![image](https://github.com/user-attachments/assets/4a417cb6-c3f3-475b-8868-146c243a7b2c)


## 📖 Descripción

Este proyecto es una Integracion Fullstack que permite consultar y filtrar personajes de **Rick and Morty** utilizando **GraphQL** y **Express** en el backend, con soporte de **Redis** para mejorar el rendimiento mediante caching. Además, incluye un frontend construido en **React**, que consume los datos de la API para mostrar personajes, con funcionalidades como búsqueda, favoritos y comentarios.

## 📋 Características

- 🚀 **GraphQL API** con filtros para consultar personajes.
![image](https://github.com/user-attachments/assets/e133d591-1a7c-4ae4-b182-4731d7ea7e54)

- 🏎️ **Cache** utilizando Redis para mejorar la velocidad de respuesta.
![image](https://github.com/user-attachments/assets/f979a908-7269-4cc2-8061-d587b221eb91)

- 🌐 **Frontend** interactivo en React, con capacidad de búsqueda, ordenamiento, detalle y favoritos (imagenes del comienzo).
- ⚡ **Backend** eficiente con **Express** para gestionar lógica del servidor(Se mostrará en la prueba Técnica).
- 🤖 **React Router Dom** para manejar la paginación de la pagina web desde el frontend.
![image](https://github.com/user-attachments/assets/4dffe9f3-11d5-4300-ac64-9d4ba07fd415)


## 🛠️ Tecnologías Utilizadas

### Backend
- **Node.js**
- **Express**
- **GraphQL**
- **Redis** (caching)

### Frontend
- **React** (con hooks)
- **TailwindCSS** (para estilos)
- **GraphQL** (Fetching para consumir la API)

## 🚀 Instalación y Uso

### 1. Clonar el Repositorio

```bash
git clone https://github.com/usuario/repo.git

```

### 2. Configuración del Backend

1. **Instalar dependencias**:
    ```bash
    cd backend
    npm install
    ```

2. **Configurar Redis**: Asegúrate de que Redis esté corriendo en tu máquina o en la nube. Si no tienes Redis instalado, puedes hacerlo siguiendo las [instrucciones oficiales](https://redis.io/download).

3. **Configurar Variables de Entorno**: En el repositorio actual ./backend existen unas variables implementadas en el archivo .env, modificalas dependiendo de tu conexion a MySql 

4. **Iniciar el servidor**:
   ### No olvides verificar que te encuentras dentro de la carpeta de backend.
    ```bash
    npm run dev
    ```

### 3. Configuración del Frontend

1. **Instalar dependencias**:
    ```bash
    cd frontend
    npm install
    ```

2. **Iniciar el frontend**:
    ```bash
    npm run dev
    ```

Si el archivo clonado trae los node modules instalados:

### En sistemas basados en Unix (Linux/macOS):
```bash
rm -rf node_modules
```

### En Windows (con Git Bash o terminal compatible):
```bash
rm -rf node_modules
```

### En Windows (con el símbolo del sistema o PowerShell):
```bash
rmdir /s /q node_modules
```

## 🎯 Funcionalidades

### GraphQL API

Puedes realizar consultas avanzadas a través de GraphQL para obtener personajes filtrando por nombre, estado, especie, género, y origen.

### Ejemplo de Root query (Retorna los 15 elementos que se encuentran en la base de datos)

```graphql
query{
  characters{
    id
    name
    status
    species
    origin
  }
}
```
### La lista sigue pero no se ve 🕵️
![image](https://github.com/user-attachments/assets/b057b842-b301-4061-9a6c-dcc58d0bfed8)



#### Ejemplo de Query con filtro (Retorna los 6 elementos que se encuentran vivos🕊️ en la base de datos):

```graphql
query{
  characters(filter: {  status: "Alive" }) {
    id
    name
    status
    species
    origin
  }
}
```
![image](https://github.com/user-attachments/assets/a27b9362-fd13-4b15-b38f-a473a3ec6a9b)

#### Respuesta del backend en Postman

![image](https://github.com/user-attachments/assets/5ee8fca6-e2de-41a4-9bd7-c7cd93507d99)


### Frontend

El frontend permite:
- Listar personajes de la API.
- Buscar personajes por nombre.
- Filtrar personajes por nombre, especie o estado.
- Agregar personajes a favoritos.
- Ver detalles de cada personaje.
- Ordenamiento segun el abecedario.
#### Esto se puede detallar en las imagenes mostradas al comienzo del repositorio (o si no en la entrevista técnica 🫒 )

## 🧰 Scripts

Porque hice dos versiones? En algunos momentos cuando tenia en cuenta el cache, no se renderizaba correctamente los elementos del frontend, entonces para el modo desarrollo simplemente decidi omitirlo.
- **Iniciar el backend**:
(Esto ejecuta el backend sin tener en cuenta el caché)
  ```bash
  npm run dev
  ```
  (Esto ejecuta el backend teniendo en cuenta el caché)
  ```bash
  npm start
  ```

- **Iniciar el frontend**:
    ```bash
    npm run dev
    ```

- **Compilar el frontend para producción**:
    ```bash
    npm run build
    ```

## 📂 Estructura del Proyecto

```

│
├── backend/           # Código del backend (Node.js, Express, GraphQL)
│   ├── graphql/       # Aqui defino los tipos, los esquemas, las cadenas de texto, agrupo los filtros en un solo objeto, defino el formato de los datos de salida (una lista), etc...(Lo demas lo explico en la prueba)
│   ├── models/        # Modelo de character y conexion con sql. Creo el modelo de base de datos llamado character porque solo tengo en cuenta los caracteres, no me da el tiempo para poner las relaciones 😔 
│   └── resolvers/     # Obtengo los datos bien sea del caché o de la base de datos (tener en cuenta que en dev solo ignoro el cache 🐬), pero en el modo que no lo ignoro los retorna solo si los encuentra.
│   └── scripts/       # Inicializacion de base de datos. Es un script que me trae los 15 primeros datos de la Api de rick y morty. (Esto solo es util si la database esta vacia 📝)
│   └── types/         # Tipo de graphql Personaje. Me define la estructura de un solo Personaje/Character
│   └── index.js       # Servidor Express con GraphQL. Creo la instancia de express, el middleware, configuro los cors, permito los metodos get y post, y los encabezados contenttype
│
├── frontend/          # Código del frontend (React, TailwindCSS)
│   ├── src/           # Componentes y lógica de React
│   └── components     # Aqui esta el contexto, las tarjetas, los filtros, la barra de busqueda, el renderizado de la pagina de detalles entre muchas cosas mas que explicare en la prueba.
│
└── README.md          # Este archivo
```

## 📚 Recursos

- [Documentación de GraphQL](https://graphql.org/learn/)
- [Express.js](https://expressjs.com/)
- [Redis](https://redis.io/documentation)

## 🤝 Contribuciones

¡Contribuciones son bienvenidas! Si deseas contribuir, por favor abre un issue o un pull request.

