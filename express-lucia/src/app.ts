require("dotenv").config();
import dotenv from "dotenv";
import express, { Express } from "express";
import cors from "cors";
import morgan from "morgan";
import bodyParser from "body-parser";

// Dotenv initialization.
dotenv.config();

// Router.
import { router } from "./router";

const app: Express = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(morgan("tiny"));
app.use("/api/v1", router);
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

app.listen(PORT, () => {
  console.log(`🚀 Server Running on http://localhost:${PORT}/api/v1`);
});
