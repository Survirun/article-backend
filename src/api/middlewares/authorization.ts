import ResponseUtil from '../../utils/response'
import {CUSTOM_ERROR, CustomError} from '../../constants/error'
import * as jwt from "jsonwebtoken";

import {NextFunction, Request, Response} from 'express'

const exceptUrl = ['/api/article','/api/v2/article','/api/v2/article/search']

const checkUID = async (req: Request, res: Response, next: NextFunction) => {
    if(req.headers["uid"]) {
        res.locals._id = req.headers["uid"]
        next();
    } else if (exceptUrl.includes(req.baseUrl) && req.headers["guest-mode"] == "true") {
        res.locals._id = "guest"
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