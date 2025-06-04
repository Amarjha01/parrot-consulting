import { Router } from "express";
import { confirmBooking, createPendingBooking, getBookingsByConsultantId } from "../controllers/Bookingcontroller.js";


const bookingRouter = Router(); 

bookingRouter.route("/createbooking").post(createPendingBooking)
bookingRouter.route("/confirmbooking").post(confirmBooking)
bookingRouter.route("/getbookingsviaConsultantid/:consultantId").get(getBookingsByConsultantId)



export default bookingRouter