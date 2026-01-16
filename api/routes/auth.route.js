import { Router } from "express";

const AuthRouter = Router();

AuthRouter.get("/", (req, res) => {
  res.send("GET---Auth Page")
})

export default AuthRouter;