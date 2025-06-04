import { Router } from "express";
import { seeallactiveconsultants } from "../controllers/Globalcontrollers.js";

const GlobalRouter = Router();

GlobalRouter.route("/globalseeallactiveconsultants").get(
  seeallactiveconsultants
);

export default GlobalRouter;
