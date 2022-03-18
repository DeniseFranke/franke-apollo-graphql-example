#!/usr/bin/env node
/*jslint browser, node*/
/*global caches, indexedDb*/

const { ApolloServer, gql } = require("apollo-server");

const typeDefs = gql`
  type Book {
    title: String
    author: String
    year: Int
  }

  type Query {
    books: [Book]
  }
`;

const books = [
  {
    author: "Christopher Alexander",
    title: "The Timeless Way of Building",
    year: 1979
  },
  {
    author: "Robert C. Martin",
    title: "Clean Code",
    year: 2009
  }
];

const resolvers = {
  Query: {
    books: () => books
  }
};

const server = new ApolloServer({ resolvers, typeDefs });
server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
