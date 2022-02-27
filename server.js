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
  const userUrl = new URL(process.env.NODE_ENV === 'test' ? req.body.url_input : req.body.url);
  if (userUrl.protocol === 'ftp:') {
    res.json({ error: 'invalid url'})
  } else if (!(userUrl.href in urlList)) {
    const newIndex = Object.keys(urlList).length + 1;
    urlList[userUrl.href] = newIndex;
  }
  res.json({
    original_url: userUrl.href,
    short_url: urlList[userUrl.href],
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