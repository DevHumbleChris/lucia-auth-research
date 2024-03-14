import express, { Router } from "express";
import { healthCheck, signup } from "../controllers";

export const router: Router = express.Router();

router.get("/health-check", healthCheck);
router.post("signup", signup);
