require("dotenv").config();

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

// Router.
const router = require("./router");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(morgan("tiny"));
app.use("/api/v1", router);

app.listen(PORT, () => {
  console.log(`🚀 Server Running on http://localhost:${PORT}/api/v1`);
});
