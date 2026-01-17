import { Router } from "express";
import { AuthInit } from "../controllers/auth.controller.js";

const AuthRouter = Router();

AuthRouter.get("/init", AuthInit);

export default AuthRouter;