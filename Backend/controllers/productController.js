const db = require("../models");

const Product = db.products;

const addProduct = async (req, res) => {
  let newProduct = req.body;
  Product.create(newProduct)
    .then((product) => {
      res.status(200).send(product);
    })
    .catch((err) => {
      res.send({ message: err });
    });
};

const getAllProducts = async (req, res) => {
  let products = await Product.findAll({});
  res.status(200).send(products);
};

const updateProduct = async (req, res) => {
  const id = req.params.id;
  Product.update(req.body, { where: { id: id } })
    .then(() => {
      Product.findOne({ where: { id: id } }).then((data) => {
        res.status(200).send(data);
      });
    })
    .catch((err) => {
      res.send({ message: err });
    });
};

const deleteProduct = async (req, res) => {
  const id = req.params.id;
  Product.destroy({ where: { id: id } })
    .then(() => {
      res.send("Product deleted successfully");
    })
    .catch((err) => {
      res.send("Deletion failed due to..." + err);
    });
};

module.exports = {
  addProduct,
  getAllProducts,
  updateProduct,
  deleteProduct,
};
