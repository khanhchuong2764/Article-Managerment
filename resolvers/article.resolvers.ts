import { uptime } from "process";
import Article from "../models/article.model"
import Category from "../models/category.model";

export const Articleresolvers  = {
    Query: {
      getListArticle: async (_,args) => {
        const {sortKey,sortValue,currentPage,limitItem} = args;
        // Sort
        const sort = {};
        if(sortKey&&sortValue) {
          sort[sortKey] = sortValue;
        }
        // End Sort
        // Pagination
        const skip = (currentPage - 1) * limitItem;
        // End Pagination
        const articles = await Article.find({
          deleted:false
        }).sort(sort).limit(limitItem).skip(skip);
        return articles;
      },
      getArticle: async (_,args) => {
        const {id} = args;
        const article = await Article.findOne({
          _id : id,
          deleted:false
        })
        return article;
      }
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
    },
    Article: {
      category: async (article) => {
        const record = await Category.findOne({_id :article.categoryId,deleted:false});
        return record;
      }
    }
  }
