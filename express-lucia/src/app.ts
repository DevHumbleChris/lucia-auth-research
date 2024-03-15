import dotenv from "dotenv";
import express, { Express, urlencoded } from "express";
import cors from "cors";
import morgan from "morgan";

// Dotenv initialization.
dotenv.config();

// Router.
import { router } from "./router/index.js";

const app: Express = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(morgan("tiny"));
app.use(express.json());
app.use("/api/v1", router);

app.listen(PORT, () => {
  console.log(`🚀 Server Running on http://localhost:${PORT}/api/v1`);
});
