import { gql } from "apollo-server-express";

export const UsertypeDefs = gql`
    type User {
        id:String,
        fullName:String,
        email:String,
        token:String,
        code:Int,
        message:String
    }
    type Query {
        getInforUser: User
    }
    input UserInput {
        fullName:String,
        email:String,
        password:String
    }
    input LoginInput {
        email:String,
        password:String
    }
    type Mutation {
      registerUser(user:UserInput): User
      loginUSer(user:LoginInput) : User
    }
  `

