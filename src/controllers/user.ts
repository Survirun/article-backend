import { Request, Response} from "express";
import ResponseUtil from "../utils/response";
import db from "../models/db";
import { CUSTOM_ERROR, CustomError } from "../constants/error";
import KeywordUtil from '../utils/keyword';
import jwt from "../utils/jwt";
import hash from "../utils/hash";

export default {
    getMy: async (req: Request, res: Response) => {
        const info = await db.user.getUser(res.locals._id);
        if(info) return ResponseUtil.success(res, 200, info);
        else throw new CustomError(CUSTOM_ERROR.USER_NOT_FOUND);
    },
    createNewUser: async (req: Request, res: Response) => {
        const id = hash(req.body.uid)
        const isReg = await db.user.isAlreadyRegistered(id)
        if(!isReg) {
            const newUser = await db.user.createNewUser(
                id, 
                req.body.email,
                req.body.name
            );
            return ResponseUtil.success(res,201, await jwt.publishAccessToken(id, "user"));
        } else {
            const userinfo = await db.user.getUser(id);
            return ResponseUtil.success(res, 200, await jwt.publishAccessToken(userinfo?.uid as string, userinfo?.permission as string));
        }
        
    },
    isAlreadyRegister: async(req: Request, res: Response) => {
        const code = (await db.user.isAlreadyRegistered(hash(req.params.uid))) ? 200 : 404;
        return ResponseUtil.success(res, code, null);
    },
    updateKeywords: async (req: Request, res: Response) => {
        const keywords: number[] = req.body.keywords;
        keywords.push(0) //common
        if(KeywordUtil.includedDevKey(keywords)) keywords.push(1) //devcommon
        const uKey = [...new Set(keywords)]
        const result = await db.user.setKeywords(res.locals._id, uKey);
        return ResponseUtil.success(res, 200, null)
    }
}