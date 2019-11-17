const express = require("express");
require("dotenv").config();
const fs = require("fs");
const { ApolloServer, gql } = require("apollo-server-express");
const { prisma } = require("./generated/prisma-client");
const Query = require("./resolvers/Query");
const Mutation = require("./resolvers/Mutation");

// Importing schema from external files
const typeDefs = gql`
  ${fs.readFileSync(__dirname.concat("/schema.graphql"), "utf8")}
`;

const resolvers = {
  Query,
  Mutation
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: req => {
    return {
      ...req,
      prisma
    };
  }
});
const app = express();

server.applyMiddleware({ app });

app.listen({ port: process.env.PORT || 4000 }, () => {
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
});
