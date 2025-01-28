import { gql } from "apollo-server-express";

export const CategorytypeDefs = gql`
    type Category {
      id:String,
      title:String,
      avatar:String
    }
    
    type Query {
      getListCategory: [Category],
      getCategory(id:ID): Category,
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
      createCategory(category:CategoryInput): Category
      updateCategory(id:ID,category:CategoryInput): Category
      deleteCategory(id:ID) : ResponseCode
    }
  `