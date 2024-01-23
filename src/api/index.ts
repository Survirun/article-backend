import { Router } from "express";
import user from "./routes/user";
import db from "../models/db";

export default () => {
    const app = Router();
    user(app);
    return app;
}