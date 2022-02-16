require("dotenv").config();
const express = require("express");
const app = express();

const port = process.env.PORT || 3000;

app.use("/public", express.static(`${process.cwd()}/public`));

app.get("/", (req, res) => {
  res.sendFile(process.cwd() + "/views/index.html");
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
