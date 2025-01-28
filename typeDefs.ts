import { gql } from "apollo-server-express";

export const typeDefs = gql`
    type Article{
      id:String,
      title:String,
      avatar: String,
      description:String,
      code: Int,
      message: String
    }
    
    type Query {
      getListArticle: [Article]
      getArticle(id:ID): Article
    }
    input ArticleInput {
      title:String,
      avatar: String,
      description:String
    }
    type ResponseCode {
      code: Int,
      message:String
    }
    type Mutation {
      createArticle(article:ArticleInput): Article
      deleteArticle(id:ID): ResponseCode
      updateArticle(id:ID,article:ArticleInput): Article
    }
  `