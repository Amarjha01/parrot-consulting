import { Router } from "express";
import { upload } from "../middlewares/multer.js";
import { ApplyAsconsultant } from "../controllers/Consultant.controller.js";

const ConsultantRouter = Router();

ConsultantRouter.route("/registerasconsultant").post(
    upload.fields([
      { name: "profilePicture", maxCount: 1 },
      { name: "resume", maxCount: 1 },
      { name: "aadhaarCard", maxCount: 1 },
      { name: "panCard", maxCount: 1 },
      { name: "passport", maxCount: 1 },
      { name: "certificates", maxCount: 8 },
    ]),
    ApplyAsconsultant
  );

export default ConsultantRouter;
