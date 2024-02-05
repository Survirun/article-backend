import {Application, Router, Request, Response, NextFunction} from "express";
import { celebrate, Joi } from 'celebrate';
import controller from '../../utils/controller';
import Authorization from '../middlewares/authorization';
import controllers from '../../controllers';

const route = Router()

export default (app: Router) => {
    app.use('/bookmark', route);

    route.get(
        '/',
        Authorization.checkUID,
        controller(controllers.bookmarkController.getBookmarks)
    )

    route.post(
        '/:articleId',
        Authorization.checkUID,
        celebrate({
            params: Joi.object({
                articleId: Joi.string().required()
            })
        }),
        controller(controllers.bookmarkController.addBookmark)
    )
}