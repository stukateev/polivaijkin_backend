const router = require('express').Router();
const {
  getProduct,
  getCategory,

  deleteProduct,
} = require('../controllers/catalog');

router.post('/', getProduct);
router.get('/category', getCategory)
router.delete('/:movieId', deleteProduct);

module.exports = router;
