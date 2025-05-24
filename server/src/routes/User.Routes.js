import { Router } from "express";
import { loginUser, logoutUser, registerUser } from "../controllers/UserController.js";
import {verifyUser} from "../middlewares/UserAuthMiddleware.js";



const userRouter = Router();
userRouter.route("/registeruser").post(registerUser)
userRouter.route("/loginuser").post(loginUser)
userRouter.route("/logoutuser").post(verifyUser , logoutUser)




export default userRouter;