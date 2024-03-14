import express, { Router } from "express";
import { healthCheck } from "../controllers";

export const router: Router = express.Router();

router.get("/health-check", healthCheck);
