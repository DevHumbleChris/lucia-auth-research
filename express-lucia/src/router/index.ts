import express, { Router } from "express";
import { healthCheck, signup, signin } from "../controllers/index.js";

export const router: Router = express.Router();

router.get("/health-check", healthCheck);
router.post("/sign-up", signup);
router.post("/sign-in", signin);
