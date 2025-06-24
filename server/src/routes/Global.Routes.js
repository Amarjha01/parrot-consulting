import { Router } from "express";
import { seeallactiveconsultants } from "../controllers/Globalcontrollers.js";
import { getReview } from "../controllers/ReviewController.js";

const GlobalRouter = Router();

GlobalRouter.route("/globalseeallactiveconsultants").get(
  seeallactiveconsultants
);

GlobalRouter.route("/getreviewslist").get(getReview);

export default GlobalRouter;
