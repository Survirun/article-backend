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

    route.get(
        '/exist/:uid',
        celebrate({
            params: Joi.object({
                uid: Joi.string().required()
            })
        }),
        controller(controllers.userController.isAlreadyRegister)
    );

    route.post(
        '/new',
        celebrate({
            body: Joi.object({
                uid: Joi.string().required(),
                email: Joi.string().email({ minDomainSegments: 2}).required(),
                name: Joi.string().required()
            })
        }),
        controller(controllers.userController.createNewUser)
    );

    route.patch(
        '/:uid/keywords',
        Authorization.checkUID,
        celebrate({
            params: Joi.object({
                uid: Joi.string().required()
            }),
            body: Joi.object({
                keywords: Joi.array().items(Joi.string()).min(1).required()
            })
        }),
        controller(controllers.userController.updateKeywords)
    );

    route.get(
        '/my',
        Authorization.checkUID,
        celebrate({
            params: Joi.object({
                uid: Joi.string().required()
            })
        }),
        controller(controllers.userController.getMy)
    )
}


