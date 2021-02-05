// Construct a schema, using GraphQL's schema language
const Note = require('./note');
const User = require('./user');
const models = {
Note,
User
};
module.exports = models;