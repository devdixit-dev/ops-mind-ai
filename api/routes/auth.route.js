import { Router } from "express";
import { AuthInit, Login, Logout, VerifyCompany } from "../controllers/auth.controller.js";
import { auth } from "../middleware/auth.middleware.js";

const AuthRouter = Router();

AuthRouter.post("/init", AuthInit);

AuthRouter.post("/verify", VerifyCompany);

AuthRouter.post("/login", Login);

AuthRouter.post("/logout", auth, Logout);

export default AuthRouter;