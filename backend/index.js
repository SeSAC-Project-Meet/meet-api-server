const express = require("express");
const { PORT } = require("./config");
const morgan = require("morgan");

const app = express();

function logger(req, res, next) {
  let logText = {
    url: req.url,
    method: req.method,
    time: new Date(),
    headers: req.headers,
    body: req.body,
    ip: req.ip, 
  };
  res.send(logText);
  console.log(logText);
  next();
}

// Middleware to log all incoming requests using morgan
app.use(morgan("combined"));
app.use(logger);

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// git rebase test
