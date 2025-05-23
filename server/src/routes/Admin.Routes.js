import  { Router } from "express";
import { approveConsultant, approvedConsultants, loginAdmin, logoutAdmin, registerAdmin, rejectConsultant, unapprovedConsultants } from "../controllers/Admincontroller.js";
import { verifyAdmin } from "../middlewares/AdminAuthMiddleware.js";
const AdminRouter = Router();


AdminRouter.route("/registeradminsecuredonly").post(registerAdmin);
AdminRouter.route("/loginadminsecuredonly").post(loginAdmin);
AdminRouter.route("/logoutadmin").post( verifyAdmin  , logoutAdmin);
AdminRouter.route("/seeunapprovedconsultants").get( verifyAdmin  , unapprovedConsultants);
AdminRouter.route("/seeapprovedconsultants").get( verifyAdmin  , approvedConsultants);
AdminRouter.route("/adminapproveconsultant/:consultantId").post( verifyAdmin  , approveConsultant);
AdminRouter.route("/adminrejectconsultant/:consultantId").post( verifyAdmin  , rejectConsultant);

export default AdminRouter;