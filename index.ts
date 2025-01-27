import express from "express"
import dotenv from "dotenv";
import * as database from "./config/database";
import { ApolloServer, gql } from "apollo-server-express";
import { Query } from "mongoose";
import { typeDefs } from "./typeDefs";
import { resolvers } from "./resolvers";
const startServer = async () => {
  dotenv.config();
  const app:any = express();
  const port:string | number = process.env.Port || 3000;
  database.connect();

  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers
  })

  await apolloServer.start();

  apolloServer.applyMiddleware({
    app:app,
    path: "/graphql"
  })


  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })
}
startServer();