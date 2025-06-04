const express = require("express");
const ProductRouters = require("./routes/productos");
const cartRouters = require("./routes/carrito");

const app = express();
const port = 8080;

app.get("/", (req, res) => {
  res.send("hola mundo, levantando puerto 8080");
});

app.listen(port, () => {
  console.log(`servidor ejecutando en puerto http://localhost:${port}`);
});
