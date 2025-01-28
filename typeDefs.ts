import { gql } from "apollo-server-express";

export const typeDefs = gql`
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
      getListArticle: [Article],  
      getArticle(id:ID): Article,
      getListCategory: [Category],
      getCategory(id:ID): Category,
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
    input CategoryInput {
      title:String,
      avatar:String
    }
    type Mutation {
      createArticle(article:ArticleInput): Article
      deleteArticle(id:ID): ResponseCode
      updateArticle(id:ID,article:ArticleInput): Article
      createCategory(category:CategoryInput): Category
      updateCategory(id:ID,category:CategoryInput): Category
      deleteCategory(id:ID) : ResponseCode
    }
  `