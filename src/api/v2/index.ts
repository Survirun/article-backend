import { Router } from "express";
import article from "./routes/article";

const router = Router();
export default (app: Router) => {  
    article(router);
    app.use('/v2', router);
    return app;
}