import { Router } from "express";
import { loginUser, logoutUser, registerUser, seeBooking } from "../controllers/UserController.js";
import {verifyUser} from "../middlewares/UserAuthMiddleware.js";



const userRouter = Router();
userRouter.route("/registeruser").post(registerUser)
userRouter.route("/loginuser").post(loginUser)
userRouter.route("/logoutuser").post(verifyUser , logoutUser)
userRouter.route("/seebookings").get(verifyUser , seeBooking)




export default userRouter;