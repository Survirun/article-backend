import {Application, Router, Request, Response, NextFunction} from "express";
import { celebrate, Joi } from 'celebrate';
import controller from '../../../utils/controller';
import Authorization from '../../middlewares/authorization';
import controllers from '../../../controllers';

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
        controller(controllers.articleControllerV2.getMyArticles)
    )

    route.get(
        '/keywords',
        Authorization.checkUID,
        celebrate({
            query: Joi.object({
                page: Joi.number().required(),
                keywords: Joi.string().required()
            })
        }),
        controller(controllers.articleControllerV2.getArticlesByKeywords)
    )


    route.get(
        '/:keyword',
        Authorization.checkUID,
        celebrate({
            params: Joi.object({
                keyword: Joi.number().required()
            }),
            query: Joi.object({
                page: Joi.number().required()
            })
        }),
        controller(controllers.articleControllerV2.getMyArticleByKeywordId)
    )
}