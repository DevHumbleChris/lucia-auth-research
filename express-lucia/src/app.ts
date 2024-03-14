require("dotenv").config();
import dotenv from "dotenv";
import express, { Express } from "express";
import cors from "cors";
import morgan from "morgan";

// Router.
import { router } from "./router";

const app: Express = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(morgan("tiny"));
app.use("/api/v1", router);

app.listen(PORT, () => {
  console.log(`🚀 Server Running on http://localhost:${PORT}/api/v1`);
});
