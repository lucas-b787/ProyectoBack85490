const express = require("express");
const ProductRouters = require("./routes/productos.rutas");
const cartRouters = require("./routes/carrito.rutas");

const app = express();
const port = 8080;

app.use(express.json());
app.use("/api/productos", ProductRouters);
app.use("/api/carrito", cartRouters);

app.get("/", (req, res) => {
  res.send("hola mundo, levantando puerto 8080");
});

app.listen(port, () => {
  console.log(`servidor ejecutando en puerto http://localhost:${port}`);
});
