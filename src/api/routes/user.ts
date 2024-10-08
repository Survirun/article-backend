import {Application, Router, Request, Response, NextFunction} from "express";
import { celebrate, Joi } from 'celebrate';
import controller from '../../utils/controller';
import Authorization from '../middlewares/authorization';
import controllers from '../../controllers';

const route = Router()

export default (
    app: Router
) => {
    app.use('/user', route);

    route.post(
        '/auth',
        celebrate({
            body: Joi.object({
                uid: Joi.string().required(),
                email: Joi.string().email({ minDomainSegments: 2}).required(),
                name: Joi.string().required()
            })
        }),
        controller(controllers.userController.createNewUser)
    );

    route.post(
        '/my/keywords',
        Authorization.checkUID,
        celebrate({
            body: Joi.object({
                keywords: Joi.array().items(Joi.number()).min(1).required()
            })
        }),
        controller(controllers.userController.updateKeywords)
    );

    route.get(
        '/my',
        Authorization.checkUID,
        controller(controllers.userController.getMy)
    )

    route.delete(
        '/my',
        Authorization.checkUID,
        controller(controllers.userController.deleteUserInfo)
    )
}


