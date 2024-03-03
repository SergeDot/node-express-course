
const express = require('express');

const app = express();
const port = 3000;
const { products } = require("./data");
const stringAfterLastSlash = new RegExp(/[^\/]+$/, 'gi');
const stringInsideSlashes = new RegExp(/(?<=^\/).*(?=[\/])/, '');

const isValidRegex = (query) => {
  try {
    new RegExp(query);
  } catch (e) {
    return false;
  };

  if (query.match(/^\/.+\/[gimsueUAJD]{0,10}$/)) {
    return true;
  };

  return false;
};

app.use(express.static('./public'));

app.get('/about', (req, res) => {
  res.status(200).send('About Page');
});

app.get('/api/v1/test', (req, res) => {
  res.json({ message: "It worked!" });
});

app.get('/api/v1/products/:productID', (req, res) => {
  const idToFind = parseInt(req.params.productID);
  const product = products.find(p => p.id === idToFind);
  if (!product) return res.status(404).json({ message: "That product was not found." });
  res.json(product);
});

app.get('/api/v1/query', (req, res) => {
  const { search, in_description, limit, max_price, min_price } = req.query;
  let sortedProducts = [...products];
  let searchQuery = search;
  if (search) {
    if (isValidRegex(search)) {
      regexBody = search.match(stringInsideSlashes)[0];
      regexMod = search.match(stringAfterLastSlash) ? search.match(stringAfterLastSlash)[0] : '';
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
});

app.all('*', (req, res) => {
  res.status(404).send('<h1>Resource not found<h1/>');
});


app.listen(port, () => {
  console.log(`Server is listening to port ${port}`);
});
