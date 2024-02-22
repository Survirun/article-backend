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

    route.post(
        '/multi',
        Authorization.checkUID,
        async (req: Request, res: Response, next: NextFunction) => {
            console.log(req.body)
        },
        celebrate({
            body: Joi.object({
                logs: Joi.array().min(1).required()
            })
        }),
        controller(controllers.logController.addMultiLog)
    )

}