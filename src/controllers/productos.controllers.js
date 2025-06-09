const productManager = require("../services/ProductManager");
const manager = new productManager("./src/data/productos.json");

module.exports = {
  getAll: async (req, res) => {
    const result = await manager.getProducts();
    res.json(result);
  },

  getById: async (req, res) => {
    const product = await manager.getProductById(req.params.pid);
    product
      ? res.json(product)
      : res.status(404).json({ error: "Producto no encontrado" });
  },

  create: async (req, res) => {
    const newProduct = await manager.addProduct(req.body);
    res.status(201).json(newProduct);
  },

  update: async (req, res) => {
    const updatedProduct = await manager.updateProduct(
      req.params.pid,
      req.body
    );
    updatedProduct
      ? res.json(updatedProduct)
      : res.status(404).json({ error: "Producto no encontrado" });
  },

  delete: async (req, res) => {
    const result = await manager.deleteProduct(req.params.pid);
    result
      ? res.json({ message: "Producto eliminado" })
      : res.status(404).json({ error: "Producto no encontrado" });
  },
};