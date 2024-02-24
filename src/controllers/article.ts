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
        //@ts-ignore
        const page: number = parseInt(req.query.page)
        const passed: Array<any> = req.body.passed
        const clickedIDs = await db.log.getSelectedLog(res.locals._id, "click")
        const articles = await db.article.getArticlesAndSubtractClicked(keywords, clickedIDs, passed, page)
        const maxPages = await db.article.getMaxPages(keywords, clickedIDs)
        return ResponseUtil.success(res, 200, {
            page: page,
            maxPage: maxPages,
            articles: articles
        })
    },
    getMyArticleByKeywordId: async (req: Request, res: Response) => {
        //@ts-ignore
        const keyword: number = req.params.keyword
        //@ts-ignore
        const page: number = parseInt(req.query.page)
        const passed: Array<any> = req.body.passed
        const clickedIDs = (res.locals._id == "guest") ? await db.log.getSelectedLog(res.locals._id, "click") : []
        const articles = await db.article.getArticlesAndSubtractClicked([keyword], clickedIDs, passed, page)
        const maxPages = await db.article.getMaxPages([keyword], clickedIDs)
        return ResponseUtil.success(res, 200, {
            page: page,
            maxPage: maxPages,
            articles: articles
        })
    }
}