const express = require('express');// Es un framework para node que facilita la creacion de servidores
const { graphqlHTTP } = require('express-graphql');//Es un middleware de express-graphql que permite integrar GraphQL con Express.
const schema = require('./graphql/schema'); //  Es el esquema de GraphQL que define cómo deben ser las consultas y datos.
const sequelize = require('./models'); // Es un ORM (Object-Relational Mapping) que te ayuda a interactuar con bases de datos SQL.
const cors = require('cors');

const app = express();// Crea una instancia de Express que se usará para definir rutas y middleware.

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  console.log(`Request Method: ${req.method}`);
  console.log(`Request URL: ${req.originalUrl}`);
  console.log(`Request Headers: ${JSON.stringify(req.headers)}`);
  console.log(`Request Body: ${JSON.stringify(req.body)}`);
  console.log('---'); // Separador para legibilidad

  next();
});
//Un middleware que se ejecuta con cada solicitud. Solo imprime en consola el método HTTP (GET, POST, etc.) y la URL de la solicitud. Luego pasa al siguiente middleware con next().

app.use(cors({
  origin: 'http://localhost:5174', // La URL de tu frontend
  methods: ['GET', 'POST'], // Métodos permitidos
  allowedHeaders: ['Content-Type'], // Encabezados permitidos
}));

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true,
}));
// Configura una ruta /graphql para manejar consultas GraphQL. graphiql: true habilita una interfaz gráfica para probar las consultas GraphQL desde el navegador.


sequelize.sync().then(() => {
  app.listen(3000, () => {
    console.log('Server running on port 3000');
  });
});

// Sincroniza los modelos de Sequelize con la base de datos, asegurándose de que las tablas estén actualizadas. Luego, cuando la sincronización está completa, inicia el servidor en el puerto 3000.
