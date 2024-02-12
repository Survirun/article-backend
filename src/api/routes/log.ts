import {Application, Router, Request, Response, NextFunction} from "express";
import { celebrate, Joi } from 'celebrate';
import controller from '../../utils/controller';
import Authorization from '../middlewares/authorization';
import controllers from '../../controllers';

const route = Router()

export default (app: Router) => {
    app.use('/log', route);

    route.post(
        '/click/:articleId',
        Authorization.checkUID,
        celebrate({
            params: Joi.object({
                articleId: Joi.string().required()
            })
        }),
        controller(controllers.logController.addClickLog)
    );

    route.post(
        '/bookmark/:articleId',
        Authorization.checkUID,
        celebrate({
            params: Joi.object({
                articleId: Joi.string().required()
            })
        }),
        controller(controllers.logController.addBookmarkLog)
    );

    route.post(
        '/share/:articleId',
        Authorization.checkUID,
        celebrate({
            params: Joi.object({
                articleId: Joi.string().required()
            })
        }),
        controller(controllers.logController.addShareLog)
    );

}