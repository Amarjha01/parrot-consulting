import { Router } from "express";
import { createOrder } from "../controllers/RazorpayController.js";


const paymentRouter = Router();



paymentRouter.route("/create-order").post(createOrder)



export const PaymentRouter = paymentRouter;