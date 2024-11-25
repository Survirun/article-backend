import { Request, Response} from "express";
import ResponseUtil from "../utils/response";
import db from "../models/db";
import { CUSTOM_ERROR, CustomError } from "../constants/error";
import Keyword from "../constants/keyword";
import ShuffleUtil from "../utils/shuffle"

export default {
    getAllQuizList: async(req: Request, res: Response) => {
        return ResponseUtil.success(res, 200, {
            quizes: await db.quiz.getAllQuiz()
        })
    }
}