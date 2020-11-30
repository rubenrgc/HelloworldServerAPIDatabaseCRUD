

1.- Se instalo MongoDB ,Mongoose --save y se agreego al archivo db.js las siguientes linea para que no diera problemas mongoose.set('useFindAndModify', false); mongoose.Promise = global.Promise; ,dotenv --save,
2 es necesario instalar la version enterprise https://docs.mongodb.com/manual/tutorial/install-mongodb-enterprise-on-ubuntu/


se instalo + graphql-iso-date@3.6.1
se creo la carpeta ..util/gravatar y se inserto el siguiente codigo 
/* Take in an email and generate a Gravatar url */
/* https://gravatar.com/site/implement/ */
const md5 = require('md5');

const gravatar = email => {
  const hash = md5(email);
  return `https://www.gravatar.com/avatar/${hash}.jpg?d=identicon`;
};

module.exports = gravatar;

se instalo npm install md5

