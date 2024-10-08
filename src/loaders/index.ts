import envLoader from './env'
import databaseLoader from './database'
import expressLoader from './express'
import routerLoader from './router'
import swaggerLoader from './swagger'
import errorLoader from './error'
import firebaseLoader from './firebase'
import {Application} from "express";

export default async ( app: Application ) => {
    await envLoader()
    //await firebaseLoader()
    await databaseLoader()
    await expressLoader(app)
    await routerLoader(app)
    await errorLoader(app)
    //await swaggerLoader(app)

}