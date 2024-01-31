import { Router } from "express";
import user from "./routes/user";
import article from './routes/article';
import bookmark from './routes/bookmark';

export default () => {
    const app = Router();
    user(app);
    article(app);
    bookmark(app);
    return app;
}