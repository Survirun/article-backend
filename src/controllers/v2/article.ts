import { Request, Response} from "express";
import ResponseUtil from "../../utils/response";
import db from "../../models/db";
import { CUSTOM_ERROR, CustomError } from "../../constants/error";
import Keyword from "../../constants/keyword";
import ShuffleUtil from "../../utils/shuffle"

export default {
    getMyArticles: async (req: Request, res: Response) => {
        const user = await db.user.getUser(res.locals._id)
        //@ts-ignore
        const keywords = (user != null) ? user.keywords : Keyword.AllKey;
        //@ts-ignore
        const page: number = parseInt(req.query.page)
        const articles = await db.article.getArticlesV2(keywords, page);
        const maxPages = await db.article.getMaxPagesV2(keywords);
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
        const keywords = (keyword == 0) ? Keyword.AllKey : [keyword];
        const articles = await db.article.getArticlesV2(keywords, page)
        const maxPages = await db.article.getMaxPagesV2(keywords)+1;
        return ResponseUtil.success(res, 200, {
            page: page,
            maxPage: maxPages,
            articles: articles
        })
    },
    getArticlesByKeywords: async (req: Request, res: Response) => {
        //@ts-ignore
        const keywords: Array<number> = req.query.keywords;
        //@ts-ignore
        const page: number = parseInt(req.query.page);
        const data= new Map<string, object>();
        for(let kw of keywords) {
            const articles = await db.article.getArticlesV2([kw], page);
            const maxPages = await db.article.getMaxPagesV2([kw])+1;
            data.set(kw.toString(), {
                page: page,
                maxPage: maxPages,
                articles: articles
            });
        }
        return ResponseUtil.success(res, 200, Object.fromEntries(data));

    },
    //for Chrome Extension API
    getArticlesBySearchKeywords: async (req: Request, res: Response) => {
        //@ts-ignore
        const page: number = parseInt(req.query.page);
        //@ts-ignore
        const searchKeyword: string = req.query.keyword;
        const maxPage = await db.article.getMaxPagesForSearchKeywords(searchKeyword);
        const articles = await db.article.getArticlesBySearchKeywords(page, searchKeyword);
        return ResponseUtil.success(res, 200, {
            page: page,
            maxPage: maxPage,
            articles: articles
        });
    }
}