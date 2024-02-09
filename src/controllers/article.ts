import { Request, Response} from "express";
import ResponseUtil from "../utils/response";
import db from "../models/db";
import { CUSTOM_ERROR, CustomError } from "../constants/error";
import Keyword from "../constants/keyword";
import ShuffleUtil from "../utils/shuffle"

export default {
    getMyArticles: async (req: Request, res: Response) => {
        const user = await db.user.getUser(res.locals._id)
        //@ts-ignore
        const keywords = user.keywords
        const articles = await db.article.getArticles(keywords)
        const shuffledArticles = ShuffleUtil(articles)
        return ResponseUtil.success(res, 200, shuffledArticles)
    },
    getMyArticleByKeywordId: async (req: Request, res: Response) => {
        //@ts-ignore
        const keyword: number = req.params.keyword
        const articles = await db.article.getArticles([keyword])
        const shuffledArticles = ShuffleUtil(articles)
        return ResponseUtil.success(res, 200, shuffledArticles)
    }
}