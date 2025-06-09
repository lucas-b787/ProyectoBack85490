const express = require("express");
const router = express.Router();
const controller = require("../controllers/carrito.controller");

router.post("/", controller.create);
router.get("/:cid", controller.getById);
router.post("/:cid/productos/:pid", controller.addProduct);

module.exports = router;
