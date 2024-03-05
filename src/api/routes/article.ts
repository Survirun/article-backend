import {Application, Router, Request, Response, NextFunction} from "express";
import { celebrate, Joi } from 'celebrate';
import controller from '../../utils/controller';
import Authorization from '../middlewares/authorization';
import controllers from '../../controllers';

const route = Router()

export default (app: Router) => {
    app.use('/article', route);

    route.post(
        '/',
        Authorization.checkUID,
        celebrate({
            query: Joi.object({
                page: Joi.number().required()
            }),
            body: Joi.object({
                passed: Joi.array().max(1000)
            })
        }),
        controller(controllers.articleController.getMyArticles)
    )


    route.post(
        '/:keyword',
        Authorization.checkUID,
        celebrate({
            params: Joi.object({
                keyword: Joi.number().required()
            }),
            query: Joi.object({
                page: Joi.number().required()
            }),
            body: Joi.object({
                passed: Joi.array().max(1000)
            })
        }),
        controller(controllers.articleController.getMyArticleByKeywordId)
    )

    route.post(
        "/report/:articleId",
        Authorization.checkUID,
        celebrate({
            params: Joi.object({
                articleId: Joi.string().required()
            }),
            body: Joi.object({
                reason: Joi.string()
            })
        }),
        controller(controllers.articleController.reportArticle)
    )
}