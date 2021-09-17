// server.js
// where your node app starts

// init project
var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...
app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});

app.get("/api/:date_string", function (req, res) {
  let date_string = req.params.date_string;
  let responseObject;
  if (new Date(date_string) == "Invalid Date" && isNaN(date_string)) {
    responseObject = { error: "Invalid Date" };
  } else if (isNaN(date_string)) {
    responseObject = {
      unix: new Date(date_string).getTime(),
      utc: new Date(date_string).toUTCString(),
    };
  } else {
    date_string = parseInt(date_string);
    responseObject = {
      unix: new Date(date_string).getTime(),
      utc: new Date(date_string).toUTCString(),
    };
  }
  res.json(responseObject);
});

app.get("/api", function (req, res) {
  const responseObject = {
    unix: new Date().getTime(),
    utc: new Date().toUTCString(),
  };
  res.json(responseObject);
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
