import { gql } from "apollo-server-express";

export const ArticletypeDefs = gql`
    type Article{
      id:String,
      title:String,
      avatar: String,
      description:String,
      code: Int,
      message: String,
      category: Category
    }
    type Category {
      id:String,
      title:String,
      avatar:String
    }
    
    type Query {
      getListArticle(
        sortKey:String,
        sortValue:String,
        currentPage:Int = 1,
        limitItem:Int = 10
      ): [Article],  
      getArticle(id:ID): Article,
    }
    input ArticleInput {
      title:String,
      avatar: String,
      description:String,
      categoryId:String
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