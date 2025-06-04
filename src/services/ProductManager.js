const fs = require("fs").promises;

const { v4: uuidv4 } = require("uuid");
class ProductManager {
  constructor(path) {
    this.path = path;
  }

  async getProducts() {
    const data = await fs.readFile(this.path, "utf-8");
    return JSON.parse(data);
  }

  async getProductById(id) {
    const products = await this.getProducts();
    return products.find((product) => product.id === id);
  }

  async addProduct(product) {
    const products = await this.getProducts();
    const newProduct = {
      id: uuidv4(),
      status: true,
      ...product,
    };
    await fs.writeFile(
      this.path,
      JSON.stringify([...products, newProduct], null, 2)
    );
    return newProduct;
  }
  async updateProduct(id, updatedProduct) {
    const products = await this.getProducts();
    const Index = products.findIndex((product) => product.id === id);
    if (Index === -1) return null;
    products[Index] = {
      ...products[Index],
      ...updatedProduct,
      id: products[Index].id,
    };

    await fs.writeFile(this.path, JSON.stringify(products, null, 2));
    return products[Index];
  }

  async deleteProduct(id) {
    const products = await this.getProducts();
    const filteredProducts = products.filter((product) => product.id !== id);
    if (filteredProducts.length === products.length) return null;
    await fs.writeFile(this.path, JSON.stringify(filteredProducts, null, 2));
    return true;
  }
}
module.exports = ProductManager;
