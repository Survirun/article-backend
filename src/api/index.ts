import { Router } from "express";
import user from "./routes/user";
import article from './routes/article';
import bookmark from './routes/bookmark';
import log from './routes/log';
import v2 from "./v2/index";
import quiz from "./routes/quiz";

export default () => {
    const app = Router();
    user(app);
    article(app);
    bookmark(app);
    log(app);
    quiz(app);
    v2(app);
    return app;
}