const Query = require("./query"); // los resolvers dependen de dos archivos uno son las consultas y esta es nuestra dependencia de las consultas o querys en esta carpeta creados los archivos js..
const Mutation = require("./mutation"); // esta tambien es una dependencia pero de las mutaciones que va requerir para los comentarios anadidos
const Note = require("./note");
const User = require("./user");

const { GraphQLDateTime } = require("graphql-iso-date"); // anadimos esta parte de codigo para hacer una dependencia de API datetime graphql para poder validar la fecha y tiempo
// To do so we’ll add validation to
// any resolver function that requests a value with a type of DateTime .

// Provide resolver functions for our schema fields
module.exports = {
  //esta simplemente es nuestra exportacion de las dos dependencias para cacharlos en nuestro otro archivo llamado src/index js
  Query,
  Mutation,
  Note,
  User,
  DateTime: GraphQLDateTime,
  
};
