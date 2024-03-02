import ResponseUtil from '../../utils/response'
import {CUSTOM_ERROR, CustomError} from '../../constants/error'
import * as jwt from "jsonwebtoken";

import {NextFunction, Request, Response} from 'express'

const exceptUrl = ['/api/article']

const checkUID = async (req: Request, res: Response, next: NextFunction) => {
    if(req.headers["x-access-token"]) {
        try {
            const decoded = await jwt.verify(req.headers["x-access-token"] as string, process.env.SECRET_KEY_JWT as string) as {uid: string, permission: string}
            res.locals._id = decoded.uid;
            res.locals.permission = decoded.permission;
            next();
        } catch(error) {
            console.log("header issue")
            console.log(req)
            return ResponseUtil.fail(res, CUSTOM_ERROR.WRONG_ARGS.status, CUSTOM_ERROR.WRONG_ARGS.message)
        }
        
    } else if (exceptUrl.includes(req.baseUrl) && req.headers["guest-mode"] == "true") {
        res.locals._id = "guest"
        res.locals.permission = "user"
        next();
    } else {
        console.log("header issue")
        console.log(req)
        return ResponseUtil.fail(res, CUSTOM_ERROR.WRONG_ARGS.status, CUSTOM_ERROR.WRONG_ARGS.message)
    }
}

export default {
    checkUID
}