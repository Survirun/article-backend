import { Router } from "express";
import user from "./routes/user";
import article from './routes/article';
import bookmark from './routes/bookmark';
import log from './routes/log';

export default () => {
    const app = Router();
    user(app);
    article(app);
    bookmark(app);
    log(app);
    return app;
}