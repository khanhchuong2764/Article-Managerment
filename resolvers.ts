import { uptime } from "process";
import Article from "./models/article.model"

export const resolvers  = {
    Query: {
      getListArticle: async () => {
        const articles = await Article.find({
          deleted:false
        }) 
        return articles;
      },
      getArticle: async (_,args) => {
        const {id} = args;
        const article = await Article.findOne({
          _id : id,
          deleted:false
        })
        return article;
      },
    },
    Mutation: {
      createArticle: async (_,args) => {
        const {article} = args;
        const record = new Article(article);
        await record.save();
        return {
          id:record.id,
          title: record.title,
          avatar: record.avatar,
          description: record.description,
          code:200,
          message: "Success"
        };
      },
      deleteArticle: async (_,args) => {
        const {id} = args;
        await Article.updateOne({_id:id,deleted:false},{deleted:true});
        return {
          code:200,
          message: "Thành Công"
        };
      },
      updateArticle: async (_,args) => {
        const {article,id} = args;
        await Article.updateOne({_id:id,deleted:false},article);
        const record = await Article.findOne({_id : id,deleted:false});
        return record;
      }
    }
  }
