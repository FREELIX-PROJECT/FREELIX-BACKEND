import { Router } from "express";
import { registerUser, userLogin } from "../controllers/user.js";

const userRouter = Router();

userRouter.post('/users/register', registerUser)

userRouter.post('/users/login', userLogin)

export default userRouter;