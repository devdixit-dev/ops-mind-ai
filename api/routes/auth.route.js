import { Router } from "express";
import { AuthInit, Login, VerifyCompany } from "../controllers/auth.controller.js";

const AuthRouter = Router();

AuthRouter.post("/init", AuthInit);

AuthRouter.post("/verify", VerifyCompany);

AuthRouter.post("/login", Login);

export default AuthRouter;