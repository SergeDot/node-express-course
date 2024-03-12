const express = require('express');
const router = express.Router();
const { getAllProducts, getProduct, searchProduct } = require('../controllers/products');

router.get('/', getAllProducts);
router.get('/itm/:productID', getProduct);
router.get('/query', searchProduct);

module.exports = router;
