const express = require("express");
/* const bodyParser = require("body-parser"); */
const data = require("./data");
const cors = require("cors");
const config = require("./config");
const sessions = require("./confsession");

const userRoute = require("./routes/userRoute");
const productRoute = require("./routes/productRoute");
const orderRoute = require("./routes/orderRoute");

const app = express();
app.use(cors());

app.use("/api/users", userRoute);
//app.use("/api/products", productRoute);
app.get("/api/products/:id", (req, res) => {
  const productId = req.params.id;
  const product = data.find((x) => x._id === productId);
  if (product) res.send(product);
  else res.status(404).send({ msg: "Product Not found." });
});

app.get("/api/products", (req, res) => {
  res.send(data);
});

app.get("/api/config/session", (req, res) => {
  res.send(sessions.allconf);
});

app.listen(4000, () => {
  console.log("Server start at http://localhost:4000");
});
