import { Router } from "express";
import { loginUser, logoutUser, registerUser, seeBooking } from "../controllers/UserController.js";
import {verifyUser} from "../middlewares/UserAuthMiddleware.js";
import { postReview } from "../controllers/ReviewController.js";



const userRouter = Router();
userRouter.route("/registeruser").post(registerUser)
userRouter.route("/loginuser").post(loginUser)
userRouter.route("/logoutuser").post(verifyUser , logoutUser)
userRouter.route("/seebookings").get(verifyUser , seeBooking)
userRouter.route("/postreview").post(verifyUser , postReview)




export default userRouter;