import { Request, Response} from "express";
import ResponseUtil from "../utils/response";
import db from "../models/db";
import { CUSTOM_ERROR, CustomError } from "../constants/error";
import Keyword from "../constants/keyword";
import ShuffleUtil from "../utils/shuffle"

export default {
    getBookmarks: async (req: Request, res: Response) => {
        const bookmarksId: string[] = await db.bookmark.getBookmark(res.locals._id)
        if(bookmarksId.length == 0) {
            return ResponseUtil.success(res, 200, [])
        }
        const articles = await db.firestore.getArticlesByDocId(bookmarksId)
        return ResponseUtil.success(res,200,articles)
    },
    addBookmark: async (req: Request, res: Response) => {
        const result = await db.bookmark.addBookmark(res.locals._id, req.params.articleId)
        return ResponseUtil.success(res, 200, null)
    },
    removeBookmark: async (req: Request, res: Response) => {
        const result = await db.bookmark.removeBookmark(res.locals._id, req.params.articleId)
        return ResponseUtil.success(res, 200, null)
    }
}