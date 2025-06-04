const fs = require("fs").promises;

const { v4: uuidv4 } = require("uuid");

class CartManager {
  constructor(path) {
    this.path = path;
  }

  async getCarts() {
    const data = await fs.readFile(this.path, "utf-8");
    return JSON.parse(data);
  }

  async createCart() {
    const carts = await this.getCarts();
    const newCart = {
      id: uuidv4(),
      products: [],
    };
    carts.push(newCart);
    await fs.writeFile(this.path, JSON.stringify(carts, null, 2));
    return newCart;
  }

  async getCartById(id) {
    const carts = await this.getCarts();
    return carts.find((cart) => cart.id === id);
  }

  async addProductToCart(cartId, productId) {
    const carts = await this.getCarts();
    const cart = carts.find((cart) => cart.id === cartId);
    if (!cart) return null;
    const productIndex = cart.products.findIndex(
      (product) => product.id === productId
    );
    if (productIndex === -1) {
      cart.products.push({ id: productId, quantity: 1 });
    } else {
      cart.products[productIndex].quantity += 1;
    }
    await fs.writeFile(this.path, JSON.stringify(carts, null, 2));
    return cart;
  }
}

module.exports = CartManager;
