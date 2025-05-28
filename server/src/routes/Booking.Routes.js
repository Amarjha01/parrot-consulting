import { Router } from "express";
import { confirmBooking, createPendingBooking } from "../controllers/Bookingcontroller.js";



const bookingRouter = Router(); 

bookingRouter.route("/createbooking").post(createPendingBooking)
bookingRouter.route("/confirmbooking").post(confirmBooking)




export default bookingRouter