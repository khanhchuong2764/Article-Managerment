import { CreateStringRamdom } from "../helpers/general";
import User from "../models/user.model";
import md5 from "md5";
export const userresolvers = {
    Query: { 
        getInforUser: async (_,args,context) => {
            if(context.req.user){
                const user = context.req.user;
                return {
                    code:200,
                    message: "Success",
                    id:user.id,
                    fullName:user.fullName,
                    token:user.token,
                    email:user.email
                };
            }
            return {
                code:400,
                message: "Token Khong Hop Le"
            }
        }
    },
    Mutation: {
        registerUser: async (_,args) => {
            const {user} = args;
            const exitsUser = await User.findOne({email:user.email,deleted:false});
            if(exitsUser) {
                return {
                    code:400,
                    message:"Email da ton tai"
                }
            }
            const dataUser = {
                fullName:user.fullName,
                email:user.email,
                password:md5(user.password),
                token:CreateStringRamdom(30)
            }
            const record = new User(dataUser);
            await record.save();
            return {
                id:record.id,
                ...dataUser,
                code:200,
                message: "Dang Ky Thanh Cong"
            }
        },
        loginUSer: async (_,args) => {
            const {email,password} = args.user;
            const user = await User.findOne({email:email,deleted:false});
            if (!user) {
                return {
                    code:400,
                    message:"Tai khoan khong ton tai"
                }
            }
            if (user.password != md5(password)) {
                return {
                    code:400,
                    message: "Mat Khau Sai"
                }
            }
            return {
                id:user.id,
                fullName:user.fullName,
                email:user.email,
                token:user.token,
                code:200,
                message: "Dang Nhap Thanh Cong"
            }
        }
    }
}