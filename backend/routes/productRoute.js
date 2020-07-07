const express = require("express");
const Product = require("../models/productModel");
const { isAuth, isAdmin } = require("../util");

const router = express.Router();

router.get("/", async (req, res) => {
  const category = req.query.category ? { category: req.query.category } : {};
  
  const products = await Product.find({ ...category})
  res.send(products);
});

router.get("/:id", async (req, res) => {
  const product = await Product.findOne({ _id: req.params.id });
  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ message: "Product Not Found." });
  }
});

router.put("/:id", isAuth, isAdmin, async (req, res) => {
  const productId = req.params.id;
  const product = await Product.findById(productId);
  if (product) {
    product.sabor = req.body.sabor;
    product.price = req.body.price;
    product.image = req.body.image;
    product.ref = req.body.ref;
    product.category = req.body.category;
    product.ingredients = req.body.ingredients;
    const updatedProduct = await product.save();
    if (updatedProduct) {
      return res
        .status(200)
        .send({ message: "Product Updated", data: updatedProduct });
    }
  }
  return res.status(500).send({ message: " Error in Updating Product." });
});

router.delete("/:id", isAuth, isAdmin, async (req, res) => {
  const deletedProduct = await Product.findById(req.params.id);
  if (deletedProduct) {
    await deletedProduct.remove();
    res.send({ message: "Product Deleted" });
  } else {
    res.send("Error in Deletion.");
  }
});

router.post("/", isAuth, isAdmin, async (req, res) => {
  const product = new Product({
    sabor: req.body.sabor,
    price: req.body.price,
    image: req.body.image,
    ref: req.body.ref,
    category: req.body.category,
    ingredients: req.body.ingredients,
    
  });
  const newProduct = await product.save();
  if (newProduct) {
    return res
      .status(201)
      .send({ message: "New Product Created", data: newProduct });
  }
  return res.status(500).send({ message: " Error in Creating Product." });
});

module.exports = router;
