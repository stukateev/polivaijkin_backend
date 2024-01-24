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
  const{skipNumber, lengthLimit, filterDict } = req.body;
  Product.find(filterDict).skip(skipNumber).limit(lengthLimit)
      .then((product) => res.status(201).send(product))
      .catch((err) => handleError(err, next));
};
const getCategory = (req, res, next) => {
  Product.find()
      .distinct('Category' )
      .then((category) => res.send(category))
      .catch((err) => handleError(err, next));
};

const getItemsInSpecificCategory = async () => {
  try {
    const distinctItems = await Product.distinct('name', );
    console.log(distinctItems);
  } catch (error) {
    console.error(error);
  }
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
  getCategory,
  deleteProduct,
};
