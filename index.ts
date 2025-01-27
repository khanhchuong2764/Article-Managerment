import express, {Express,Request,Response} from "express"
import dotenv from "dotenv";
dotenv.config();
const app:Express = express();
const port:string | number = process.env.Port || 3000;

import * as database from "./config/database";

database.connect();

import Article from "./models/article.model";

// Rest API
app.get('/articles', async (req:Request, res:Response) => {
    const articles = await Article.find({
        deleted:false
    });
    res.json({
        articles : articles
    });
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})