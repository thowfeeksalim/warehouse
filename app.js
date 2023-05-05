const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const productsRoute = require("./routes/products");

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/", productsRoute);


app.listen(3000, () => {
  console.log("Server started on port 3000");
});