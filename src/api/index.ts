import { Router } from "express";
import user from "./routes/user";
import article from './routes/article';

export default () => {
    const app = Router();
    user(app);
    article(app);
    return app;
}