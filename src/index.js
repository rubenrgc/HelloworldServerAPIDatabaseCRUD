const express = require("express"); // dependencia de el modulo express server
const { ApolloServer } = require("apollo-server-express"); //conexion con el modulo server
const jwt = require("jsonwebtoken");
// first require the package at the top of the file
const helmet = require("helmet");
// first require the package at the top of the file
const cors = require("cors");
// import the modules at the top of the file
const depthLimit = require("graphql-depth-limit");
const { createComplexityLimitRule } = require("graphql-validation-complexity");
require("dotenv").config(); // modulo de dependencia de dotenv para las variables de entorno de la base de datos

// Local Module Imports.
// Importacion de modulos locales.
const db = require("./db"); //conexion a nuestra base de datos wque se encuentra en el archivo db.js mongoose
const models = require("./models"); // conexion al modelo de base de datos
const typeDefs = require("./schema"); // conexion con nuestro archivo Schema que administra el esquema de la bae de datos
const resolvers = require("./resolvers"); // se agreega esta linea de codig para importar los resolvers que se encuentran en la carpeta resolvers por medio del index.

// Run the server on a port specified in our .env file or port 4000
// Correr nuestro servidor en el puerto 4000.
const port = process.env.PORT || 4000;

// Store the DB_HOST value as a variable.
// Almacenamos el valor del host de la base de datos.
const DB_HOST = process.env.DB_HOST;

// Variable para el metodo express del server
const app = express();
// Connect to the database
db.connect(DB_HOST);
// add the middleware at the top of the stack, after const app = express()
app.use(helmet());
// add the middleware after app.use(helmet());
app.use(cors());

// get the user info from a JWT
const getUser = (token) => {
  if (token) {
    try {
      // return the user information from the token
      return jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      // if there's a problem with the token, throw an error
      throw new Error("Session invalid");
    }
  }
};
// let notes = [
//   { id: "1", content: "This is a note", author: "Adam Scott" },
//   { id: "2", content: "This is another note", author: "Harlow Everly" },
//   { id: "3", content: "Oh hey look, another note!", author: "Riley Harrison" },
// ];

// Construct a schema, using GraphQL's schema language
//aqui ponemos nuestros esquemas de datos de graphql
// const typeDefs = gql`
//   type Note {
//     id: ID!
//     content: String!
//     author: String!
//   }

//   type Query {
//     hello: String!
//     notes: [Note!]!
//     note(id: ID!): Note!
//   }
//   type Mutation {
//     newNote(content: String!): Note!
//   }
// `;
// Provide resolver functions for our schema fields
// aqui ponemos los resolvers (query and mutations)(consultas o mutaciones)
// el siguiente codigo fue sustituido parael archivo query.js

// const resolvers = {
//   Query: {
//     hello: () => "Hello world!",
//     notes: async () => {
//       return await models.Note.find();
//     },
//     note: async (parent, args) => {
//       return await models.Note.findById(args.id);
//     },
//   },
//   Mutation: {
//     newNote: async (parent, args) => {
//       return await models.Note.create({
//         content: args.content,
//         author: "Adam Scott",
//       });
//     },
//   },
// };

// Apollo Server setup
//(codigo anterior)const server = new ApolloServer({ typeDefs, resolvers });
// Apollo Server setup (sustitucion)
// update our ApolloServer code to include validationRules
const server = new ApolloServer({
  typeDefs,
  resolvers,
  validationRules: [depthLimit(5), createComplexityLimitRule(1000)],
  context: async ({ req }) => {
    // get the user token from the headers
    const token = req.headers.authorization;
    const user = await getUser(token);
    // add the db models and the user to the context
    return { models, user };
  },
});

// Apply the Apollo GraphQL middleware and set the path to /api
server.applyMiddleware({ app, path: "/api" });

app.listen({ port }, () =>
  console.log(
    `GraphQL Server running at http://localhost:${port}${server.graphqlPath}`
  )
);
//this app is focus in CRUD Operations . Quinto commit.
