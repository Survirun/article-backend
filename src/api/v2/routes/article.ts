import {Application, Router, Request, Response, NextFunction} from "express";
import { celebrate, Joi } from 'celebrate';
import controller from '../../../utils/controller';
import Authorization from '../../middlewares/authorization';
import controllers from '../../../controllers';

const route = Router()

const joiKeywordsStringToList = Joi.string().custom((value, helpers) => {
    try {
        const parsed = JSON.parse(value);
        if(!Array.isArray(parsed)) return helpers.error("any.invalid");
        if(!parsed.every(num => typeof num === 'number')) return helpers.error("any.invalid");
        return parsed;
    } catch (e) {
        return helpers.error("any.invalid");
    }
}).required();

export default (app: Router) => {
    app.use('/article', route);
    route.get(
        '/',
        Authorization.checkUID,
        celebrate({
            query: Joi.object({
                page: Joi.number().min(1).required()
            })
        }),
        controller(controllers.articleControllerV2.getMyArticles)
    )

    route.get(
        '/keywords',
        Authorization.checkUID,
        celebrate({
            query: Joi.object({
                page: Joi.number().min(1).required(),
                keywords: joiKeywordsStringToList
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