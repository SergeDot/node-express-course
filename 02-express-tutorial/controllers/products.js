let { products } = require('../data');
let { stringAfterLastSlash, stringInsideSlashes, isValidRegex } = require('../utils/regularExp');

const getAllProducts = (_, res) => {
  res.status(200).json(products);
};

const getProduct = (req, res) => {
  const idToFind = parseInt(req.params.productID);
  const product = products.find(product => product.id === idToFind);
  if (!product) return res.status(404).json({ message: `The product with id ${id} was not found.` });
  res.status(404).json(product);
};

const searchProduct = (req, res) => {
  const { search, in_description, limit, max_price, min_price } = req.query;
  let sortedProducts = [...products];
  let searchQuery = search;
  if (search) {
    if (isValidRegex(search)) {
      const regexBody = search.match(stringInsideSlashes)[0];
      const regexMod = search.match(stringAfterLastSlash) ? search.match(stringAfterLastSlash)[0] : '';
      searchQuery = new RegExp(regexBody, regexMod);
    };
    if (in_description && in_description == 'true') {
      sortedProducts = sortedProducts.filter(el => el.name.match(searchQuery) || el.desc.match(searchQuery));
    } else {
      sortedProducts = sortedProducts.filter(el => el.name.match(searchQuery));
    };
  };
  if (limit) {
    sortedProducts = sortedProducts.slice(0, Number(limit));
  };
  if (max_price) {
    sortedProducts = sortedProducts.filter(product => product.price < Number(max_price));
  };
  if (min_price) {
    sortedProducts = sortedProducts.filter(product => product.price > Number(max_price));
  };
  if (!sortedProducts.length) {
    return res.status(200).json({ success: true, data: [] });
  };
  res.status(200).json(sortedProducts);
};

module.exports = { getAllProducts, getProduct, searchProduct };
