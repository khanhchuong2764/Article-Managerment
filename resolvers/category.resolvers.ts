import { uptime } from "process";
import Category from "../models/category.model";

export const Categoryresolvers  = {
    Query: {
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
    }
  }
