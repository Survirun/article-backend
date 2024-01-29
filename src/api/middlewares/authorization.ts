import ResponseUtil from '../../utils/response'
import {CUSTOM_ERROR, CustomError} from '../../constants/error'

import {NextFunction, Request, Response} from 'express'
const checkUID = async (req: Request, res: Response, next: NextFunction) => {
    if(req.headers.uid) {
        res.locals._id = req.headers.uid;
        next();
    } else {
        console.log("header issue")
        console.log(req.headers)
        return ResponseUtil.fail(res, CUSTOM_ERROR.WRONG_ARGS.status, CUSTOM_ERROR.WRONG_ARGS.message)
    }
}

export default {
    checkUID
}