import { Router } from "express";
import { getUserProfile, registerUser, userLogin } from "../controllers/user.js";
import { isAuthenticated } from "../middlewares/auth.js";

const userRouter = Router();

userRouter.post('/users/register', registerUser)

userRouter.post('/users/login', userLogin)

userRouter.get('/users/me', isAuthenticated, getUserProfile)

export default userRouter;