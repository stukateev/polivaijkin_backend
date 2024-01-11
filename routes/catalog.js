const router = require('express').Router();
const {
  getProduct,
  createProduct,
  deleteProduct,
} = require('../controllers/catalog');

router.get('/', getProduct);
router.post('/', createProduct);
router.delete('/:movieId', deleteProduct);

module.exports = router;
