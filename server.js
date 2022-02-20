
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
let urlList = {};

app.use("/api/shorturl", bodyParser.json());
app.use("/public", express.static(`${process.cwd()}/public`));

app.get("/", (req, res) => {
  res.sendFile(process.cwd() + "/views/index.html");
});

app.post("/api/shorturl", (req, res) => {
  userUrl = req.body.url_input
  if(!(userUrl in urlList)){
    newIndex = Object.keys(urlList).length + 1;
    urlList[userUrl] = newIndex;
  }
  res.json({
    original_url: userUrl,
    short_url: urlList[userUrl],
  });
});

module.exports = app;
