import { Request, Response } from 'express'

export default (fn: Function) => {
    return (req: Request, res: Response, next: Function) => {
        fn(req,res,next).catch(next)
    }
}