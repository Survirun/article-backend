import {Application, NextFunction, Request, Response} from "express";
import ResponseUtil from '../utils/response'
import {CustomError} from "../constants/error";

export default async (app: Application) => {
    app.use((err: CustomError | Error, req: Request, res: Response, next: NextFunction) => {
        console.error(err)
        if(err instanceof CustomError) {
            ResponseUtil.fail(res, err.status, err.message)
        } else {
            ResponseUtil.fail(res, 500, err.message)
        }
    })
}