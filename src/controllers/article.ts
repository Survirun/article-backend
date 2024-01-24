import { Request, Response} from "express";
import ResponseUtil from "../utils/response";
import db from "../models/db";
import { CUSTOM_ERROR, CustomError } from "../constants/error";

export default {
    getMyArticles: async (req: Request, res: Response) => {
        const user = await db.user.getUser(res.locals._id)
        //@ts-ignore
        const keywords = user.keywords
        console.log("DEV >", keywords)
        const articles = await db.firestore.getArticle(keywords)
        return ResponseUtil.success(res, 200, articles)
    }
}