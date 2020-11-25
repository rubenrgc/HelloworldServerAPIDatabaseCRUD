const Query = require("./query"); // los resolvers dependen de dos archivos uno son las consultas y esta es nuestra dependencia de las consultas o querys en esta carpeta creados los archivos js..
const Mutation = require("./mutation"); // esta tambien es una dependencia pero de las mutaciones que va requerir para los comentarios anadidos
const { GraphQLDateTime } = require('graphql-iso-date');// anadimos esta parte de codigo para hacer una dependencia de datetime graphql para poder validar la fecha y tiempo


module.exports = {
  //esta simplemente es nuestra exportacion de las dos dependencias para cacharlos en nuestro otro archivo llamado src/index js
  Query,
  Mutation,
  DateTime: GraphQLDateTime
};
