const Product = require('../models/catalog');
const { handleError, FORBIDDEN } = require('../utils/errors');
const validator = require("validator");

const createProduct = (req, res, next) => {
  const {
    Article, Title, price, sale, availability, description, manufactured, diameter1,
    diameter2, diameter3, carving1, carving2, carving3, carvingInt1, carvingInt2,
    carvingInt3, carvingSprinkler, typeSprinkler, typeNozzle, radius, controllerWifi,
    controllerOutdoor, controllerValve, controllerAutonomous, image, instructionLink,
    productId
  } = req.body;

  return Product.create({
    article, title, price, sale, availability, description, manufactured, diameter1,
    diameter2, diameter3, carving1, carving2, carving3, carvingInt1, carvingInt2,
    carvingInt3, carvingSprinkler, typeSprinkler, typeNozzle, radius, controllerWifi,
    controllerOutdoor, controllerValve, controllerAutonomous, image, instructionLink,
    productId
  })
    .then((product) => res.status(201).send(product))
    .catch((err) => handleError(err, next));
};

const getProduct = (req, res, next) => {
  const owner = req.user._id;
  Product.find({ owner })
    .then((product) => res.send(product))
    .catch((err) => handleError(err, next));
};

const deleteProduct = (req, res, next) => {
  const { movieId } = req.params;
  return Product.findById(movieId)
    .orFail()
    .then((product) => {
      if (product.owner.toString() === req.user._id) {
        Product.findByIdAndRemove(movieId)
          .orFail()
          .then((deletedProduct) => res.send(deletedProduct));
      } else {
        throw new FORBIDDEN();
      }
    })
    .catch((err) => handleError(err, next));
};

module.exports = {
  getProduct,
  createProduct,
  deleteProduct,
};
