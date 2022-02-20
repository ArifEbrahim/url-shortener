const express = require("express");
const app = express();
const bodyParser = require("body-parser");
let urlList = {};

app.use('/api/shorturl', bodyParser.urlencoded({ extended: false }));
app.use("/api/shorturl", bodyParser.json());
app.use("/public", express.static(`${process.cwd()}/public`));

app.get("/", (req, res) => {
  res.sendFile(process.cwd() + "/views/index.html");
});

app.post("/api/shorturl", (req, res) => {
  const userUrl = process.env.NODE_ENV === 'test' ? req.body.url_input : req.body.url;
  if (!(userUrl in urlList)) {
    const newIndex = Object.keys(urlList).length + 1;
    urlList[userUrl] = newIndex;
  }
  console.log(process.env)
  res.json({
    original_url: userUrl,
    short_url: urlList[userUrl],
  });
});

app.get("/api/shorturl/:urlNumber", (req, res) => {
  const urlNumber = req.params.urlNumber;
  let desiredUrl;
  for (const [key, value] of Object.entries(urlList)) {
    if(value == urlNumber) {
      desiredUrl = key;
    }
  }
  res.redirect(desiredUrl);
});

module.exports = app;
// app.listen(3000)