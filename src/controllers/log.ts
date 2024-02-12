import { Request, Response} from "express";
import ResponseUtil from "../utils/response";
import db from "../models/db";
import { CUSTOM_ERROR, CustomError } from "../constants/error";
import Keyword from "../constants/keyword";
import ShuffleUtil from "../utils/shuffle"

export default {
    addBookmarkLog: async (req: Request, res: Response) => {
        await db.log.addLog(res.locals._id, "bookmark", req.params.articleId);
        await db.article.addWeight(req.params.articleId, 20)
        return ResponseUtil.success(res, 200, null)
    },
    addShareLog: async (req: Request, res: Response) => {
        await db.log.addLog(res.locals._id, "share", req.params.articleId);
        await db.article.addWeight(req.params.articleId, 30)
        return ResponseUtil.success(res, 200, null)
    },
    addClickLog: async (req: Request, res: Response) => {
        await db.log.addLog(res.locals._id, "click", req.params.articleId);
        await db.article.addWeight(req.params.articleId, 10)
        return ResponseUtil.success(res, 200, null)
    },
    addMultiLog: async (req: Request, res: Response) => {
        const logs: Array<any> = req.body.logs; // articleId, type
        await db.log.addBulkLog(res.locals._id, logs);
        await db.article.addBulkWeight(logs);
        return ResponseUtil.success(res, 200, null)
    }
}   