/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-var */
var argv = require("yargs").argv;
var compression = require("compression");
var express = require("express");

var { PORT } = process.env;

var port = PORT || 8080;
var base = argv.base || "";

var renderIndex = (req, res) => {
  res.sendFile("index.html", {
    root: base,
  });
};

var app = express();

app.use(compression());
app.use(express.static(base));

app.get("/*", renderIndex);

var server = app.listen(port, function() {
  if (!argv.silent) {
    console.log(`CA app is available on http://localhost:${server.address().port}`);
  }
});
