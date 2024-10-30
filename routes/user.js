import { Router } from "express";
import { getUserProfile, registerUser, updateUserProfile, userLogin } from "../controllers/user.js";
import { isAuthenticated } from "../middlewares/auth.js";
import { userAvatarUpload } from "../middlewares/upload.js";

const userRouter = Router();

userRouter.post('/users/register', registerUser)

userRouter.post('/users/login', userLogin)

userRouter.get('/users/me', isAuthenticated, getUserProfile)

userRouter.patch('/users/me', isAuthenticated, userAvatarUpload.single('avatar'), updateUserProfile)


export default userRouter;