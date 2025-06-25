import { Router } from "express";
import { seeallactiveconsultants, viewSingleConsultant } from "../controllers/Globalcontrollers.js";

const GlobalRouter = Router();

GlobalRouter.route("/globalseeallactiveconsultants").get(
  seeallactiveconsultants
);
GlobalRouter.route("/viewSingleConsultant").post(
  viewSingleConsultant
);

export default GlobalRouter;
