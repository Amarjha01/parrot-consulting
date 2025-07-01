import { Router } from "express";
import { webhook } from "../controllers/webhook.js";
import express from "express";



const webhookrouter = Router();

webhookrouter.post("/razorpay", express.json({ verify: (req, res, buf) => {
  req.rawBody = buf;
}}), webhook);

export default webhookrouter;
