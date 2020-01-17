const express = require("express");
const path = require("path");
const data = require("./data.json");

const app = express();

const port = 3000;

app.get("/data", (_req, res) => {
  res.json(data);
});

app.use(express.static(path.resolve(__dirname, "..", "public")));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
