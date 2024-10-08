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
        const keywords = (user != null) ? user.keywords : Keyword.AllKey;
        //@ts-ignore
        const page: number = parseInt(req.query.page)
        const clickedIDs = await db.log.getSelectedLog(res.locals._id, "click")
        const articles = await db.article.getArticlesAndSubtractClicked(keywords, clickedIDs, [], page)
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
        const clickedIDs = (res.locals._id != "guest") ? await db.log.getSelectedLog(res.locals._id, "click") : []
        const keywords = (keyword == 0) ? Keyword.AllKey : [keyword];
        const articles = await db.article.getArticlesAndSubtractClicked(keywords, clickedIDs, [], page)
        const maxPages = await db.article.getMaxPages(keywords, clickedIDs)+1;
        console.log(articles);
        return ResponseUtil.success(res, 200, {
            page: page,
            maxPage: maxPages,
            articles: articles
        })
    },
    getArticlesByKeywords: async (req: Request, res: Response) => {
        const keywords: Array<number>  = req.body.keywords;
        //@ts-ignore
        const page: number = parseInt(req.query.page);
        const clickedIDs = (res.locals._id != "guest") ? await db.log.getSelectedLog(res.locals._id, "click") : []
        const data= new Map<string, object>();
        for(let kw of keywords) {
            const articles = await db.article.getArticlesAndSubtractClicked([kw], clickedIDs, [], page);
            const maxPages = await db.article.getMaxPages([kw], clickedIDs)+1;
            data.set(kw.toString(), {
                page: page,
                maxPage: maxPages,
                articles: articles
            });
        }
        return ResponseUtil.success(res, 200, Object.fromEntries(data));

    },
    reportArticle: async(req: Request, res: Response) => {
        const {articleId} = req.params;
        const {reason} = req.body;
        const result = await db.report.addReport(articleId, res.locals._id, reason)
        return (result) ? ResponseUtil.success(res, 200,null) : ResponseUtil.fail(res,400,"already reported")
    },
    getAllKeywords: async(req: Request, res: Response) => {
        return ResponseUtil.success(res, 200, Keyword.AllKey);
    }
}
