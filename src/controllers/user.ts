import { Request, Response} from "express";
import ResponseUtil from "../utils/response";
import db from "../models/db";
import { CUSTOM_ERROR, CustomError } from "../constants/error";
import category from "../constants/category";

export default {
    getMy: async (req: Request, res: Response) => {
        const info = await db.user.getUser(res.locals._id);
        if(info) return ResponseUtil.success(res, 200, info);
        else throw new CustomError(CUSTOM_ERROR.USER_NOT_FOUND);
    },
    createNewUser: async (req: Request, res: Response) => {
        const newUser = await db.user.createNewUser(
            req.body.uid, 
            req.body.email,
            req.body.name
        );
        return ResponseUtil.success(res,201,null);
    },
    isAlreadyRegister: async(req: Request, res: Response) => {
        const code = (await db.user.isAlreadyRegistered(req.params.uid)) ? 200 : 404;
        return ResponseUtil.success(res, code, null);
    },
    updateKeywords: async (req: Request, res: Response) => {
        const keywords = req.body.keywords;
        let keywordList: string[] = [];
        for(const k of keywords) {
            keywordList = [...keywordList, ...category.getSKeyword(k)]
        }
        const result = await db.user.setKeywords(res.locals._id, keywordList);
        return ResponseUtil.success(res, 200, null)
    }
}