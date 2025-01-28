import { uptime } from "process";
import Article from "./models/article.model"
import Category from "./models/category.model";

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
      getListCategory: async () => {
        const categorys = await Category.find({
          deleted:false
        });
        return categorys;
      },
      getCategory: async (_,args) => {
        const {id} = args;
        const category = await Category.findOne({
          _id : id,
          deleted:false
        })
        return category;
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
      }, 
      createCategory : async (_,args) => {
        const {category} = args;
        const record = new Category(category);
        await record.save();
        return {
          id: record.id,
          title:record.title,
          avatar:record.avatar
        };
      },
      updateCategory: async (_,args) => {
        const {id,category} = args;
        await Category.updateOne({_id : id,deleted:false},category);
        const record = await Category.findOne({_id:id,deleted:false});
        return {
          id:record.id,
          avatar: record.avatar,
          title: record.title
        };
      },
      deleteCategory: async (_,args) => {
        const {id} = args;
        await Category.updateOne({_id:id,deleted:false},{deleted:true});
        return {
          code:200,
          message: "Thanh Cong"
        }
      }
    },
    Article: {
      category: async (article) => {
        const record = await Category.findOne({_id :article.categoryId,deleted:false});
        return record;
      }
    }
  }
