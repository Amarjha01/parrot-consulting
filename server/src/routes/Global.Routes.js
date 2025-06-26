import { Router } from "express";

import { seeallactiveconsultants, viewSingleConsultant } from "../controllers/Globalcontrollers.js";

import { getReview } from "../controllers/ReviewController.js";


const GlobalRouter = Router();

GlobalRouter.route("/globalseeallactiveconsultants").get(
  seeallactiveconsultants
);
GlobalRouter.route("/viewSingleConsultant").post(
  viewSingleConsultant
);

GlobalRouter.route("/getreviewslist").get(getReview);

export default GlobalRouter;
