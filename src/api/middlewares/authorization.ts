import ResponseUtil from '../../utils/response'
import {CUSTOM_ERROR, CustomError} from '../../constants/error'

import {NextFunction, Request, Response} from 'express'
const checkUID = async (req: Request, res: Response, next: NextFunction) => {
    if(req.headers.uid) {
        next()
    } else {
        return ResponseUtil.fail(res, CUSTOM_ERROR.WRONG_ARGS.status, CUSTOM_ERROR.WRONG_ARGS.message)
    }
}

export default {
    checkUID
}