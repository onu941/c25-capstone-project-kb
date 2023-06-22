let express = require("express");
let { print } = require("listening-on");

let app = express();

app.get("/", (req, res) => {
  res.end("hello world");
});

let port = 8100;
app.listen(port, () => {
  print(port);
});
