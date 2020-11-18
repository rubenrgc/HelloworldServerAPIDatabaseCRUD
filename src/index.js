const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
require('dotenv').config();
const db = require('./db');
const models = require('./models');
// Run the server on a port specified in our .env file or port 4000
const port = process.env.PORT || 4000;
// Store the DB_HOST value as a variable
const DB_HOST = process.env.DB_HOST;

let notes = [
  { id: "1", content: "This is a note", author: "Adam Scott" },
  { id: "2", content: "This is another note", author: "Harlow Everly" },
  { id: "3", content: "Oh hey look, another note!", author: "Riley Harrison" },
];

// Construct a schema, using GraphQL's schema language
//aqui ponemos nuestros esquemas de datos de graphql
const typeDefs = gql`
  type Note {
    id: ID!
    content: String!
    author: String!
  }

  type Query {
    hello: String!
    notes: [Note!]!
    note(id: ID!): Note!
  }
  type Mutation {
    newNote(content: String!): Note!
  }
`;
// Provide resolver functions for our schema fields
// aqui ponemos los resolvers (query and mutations)(consultas o mutaciones)
const resolvers = {
  Query: {
    hello: () => "Hello world!",
    notes: async () => {
      return await models.Note.find();
      },
      note: async (parent, args) => {
        return await models.Note.findById(args.id);
        },
  },
  Mutation: {
    newNote: async (parent, args) => {
      return await models.Note.create({
      content: args.content,
      author: 'Adam Scott'
      });
      },
  },
};

const app = express();
// Connect to the database
db.connect(DB_HOST);
// Apollo Server setup
const server = new ApolloServer({ typeDefs, resolvers });
// Apply the Apollo GraphQL middleware and set the path to /api
server.applyMiddleware({ app, path: '/api' });

app.listen({ port }, () =>
  console.log(
    `GraphQL Server running at http://localhost:${port}${server.graphqlPath}`
  )
);
