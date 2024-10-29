import { Router } from "express";
import { registerUser } from "../controllers/user.js";

const userRouter = Router();

userRouter.post('/users/register', registerUser)

export default userRouter;