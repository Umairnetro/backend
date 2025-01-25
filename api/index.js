const express = require("express");
const connectDB = require("../config/db");
const router = require("../routers");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use("/api", router);

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
  connectDB();
});

module.exports = app;
