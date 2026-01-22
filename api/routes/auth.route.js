import { Router } from "express";
import { AuthInit, VerifyCompany } from "../controllers/auth.controller.js";

const AuthRouter = Router();

AuthRouter.post("/init", AuthInit);

AuthRouter.post("/verify", VerifyCompany);

export default AuthRouter;