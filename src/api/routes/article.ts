import {Application, Router, Request, Response, NextFunction} from "express";
import { celebrate, Joi } from 'celebrate';
import controller from '../../utils/controller';
import Authorization from '../middlewares/authorization';
import controllers from '../../controllers';

const route = Router()

export default (app: Router) => {
    app.use('/article', route);

    route.get(
        '/',
        Authorization.checkUID,
        celebrate({
            query: Joi.object({
                page: Joi.number().required()
            })
        }),
        controller(controllers.articleController.getMyArticles)
    )

    route.get(
        '/:keyword',
        Authorization.checkUID,
        celebrate({
            params: Joi.object({
                keyword: Joi.number()
            }),
            query: Joi.object({
                page: Joi.number().required()
            })
        }),
        controller(controllers.articleController.getMyArticleByKeywordId)
    )
}