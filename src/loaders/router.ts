import api from '../api/index'

import {Application} from "express";

export default async (app: Application) => {
    app.use('/api', api())
}