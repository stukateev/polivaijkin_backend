const router = require('express').Router();
const {
  getProduct,
  getCategory,
  getFilter,
  deleteProduct,
  getMinPriceFilter,
  getPreFilterCount,
  getMaxPriceFilter
} = require('../controllers/catalog');

router.get('/', getProduct);
router.get('/category', getCategory)
router.get('/max-price-filter', getMaxPriceFilter)
router.get('/min-price-filter', getMinPriceFilter)
router.get('/pre-filter-count', getPreFilterCount)
router.get('/filter', getFilter)
router.delete('/:movieId', deleteProduct);

module.exports = router;
