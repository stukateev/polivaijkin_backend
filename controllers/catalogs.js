const Product = require('../models/catalogs');
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
  const { skipNumber, lengthLimit, filterDict } = req.query;
  const filter = JSON.parse(filterDict);
  const skip = parseInt(skipNumber, 10) || 0;
  const limit = parseInt(lengthLimit, 10) || 10;
  Product.find(filter).skip(skip).limit(limit)
      .then((product) => res.status(200).send(product))
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
const getFilter = (req, res, next) => {
  const { filterDict } = req.query;
  const filter = JSON.parse(filterDict);

  Product.find(filter,
      'Price',
      'Manufactured',
      'Diameter1',
      'Diameter2',
      'Diameter3',
      'Carving1',
      'Carving2',
      'Carving3',
      'CarvingInt1',
      'CarvingInt2',
      'CarvingInt3',
      'CarvingSprinkler',
      'TypeSprinkler',
      'TypeNozzle',
      'Radius',
      'ControllerWifi',
      'ControllerOutdoor',
      'ControllerValve',
      'ControllerAutonomous')
      .then((product) => res.status(200).send(product))
      .catch((err) => handleError(err, next));
};


const getPreFilterCount = (req, res, next) => {
  const { filterDict } = req.query;
  const filter = JSON.parse(filterDict);
  Product.find(filter).count()
      .then((count) => res.status(200).json({ count }))
      .catch((err) => handleError(err, next));
};

const getMaxPriceFilter = (req, res, next) => {
  const { filterDict } = req.query;
  const filter = JSON.parse(filterDict);
  Product.aggregate([
    { $match: filter },
    {
      $group: {
        _id: null,
        maxPrice: { $max: "$Price" }
      }
    }
  ])
      .then(result => {
        if (result.length > 0) {
          res.status(200).json({ maxPrice: result[0].maxPrice });
        } else {
          res.status(404).json({ message: "No products found" });
        }
      })
      .catch(err => handleError(err, next));
};

const getMinPriceFilter = (req, res, next) => {
  const { filterDict } = req.query;
  const filter = JSON.parse(filterDict);

  Product.aggregate([
    { $match: filter },
    {
      $group: {
        _id: null,
        minPrice: { $min: "$Price" }
      }
    }
  ])
      .then(result => {
        if (result.length > 0) {
          res.status(200).json({ minPrice: result[0].minPrice });
        } else {
          res.status(404).json({ message: "No products found" });
        }
      })
      .catch(err => handleError(err, next));
};

module.exports = {
  getProduct,
  getFilter,
  getCategory,
  getMinPriceFilter,
  getMaxPriceFilter,
  getPreFilterCount,
  deleteProduct,
};
