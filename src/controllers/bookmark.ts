import { Request, Response} from "express";
import ResponseUtil from "../utils/response";
import db from "../models/db";
import { CUSTOM_ERROR, CustomError } from "../constants/error";
import Keyword from "../constants/keyword";
import ShuffleUtil from "../utils/shuffle"

export default {
    getBookmarks: async (req: Request, res: Response) => {
        const articles = await db.bookmark.getBookmark_v2(res.locals._id)
        if(articles.length == 0) {
            return ResponseUtil.success(res, 200, [])
        }
        return ResponseUtil.success(res,200,articles)
    },
    addBookmark: async (req: Request, res: Response) => {
        if(await db.bookmark.isAlreadyIn(res.locals._id, req.params.articleId)) {
            const result = await db.bookmark.removeBookmark(res.locals._id, req.params.articleId)
            return ResponseUtil.success(res, 200, false)
        } else {
            const result = await db.bookmark.addBookmark(res.locals._id, req.params.articleId)
            return ResponseUtil.success(res, 200, true)
        }
    }
}