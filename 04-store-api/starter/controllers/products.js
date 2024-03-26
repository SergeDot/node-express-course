import Product from '../models/product.js'

const getAllProductsStatic = async (req, res) => {
  const products = await Product.find({ price: { $gt: 30 } });
  res.status(200).json({ found: products.length, products })
};

const getAllProducts = async (req, res) => {
  const { featured, company, name, sort, fields, numericFilters } = req.query;
  const queryObject = {};
  const regEx = /\b(<|>|<=|>=|=\b)/g
  const numericOptions = ['price', 'rating'];
  const operatorMap = {
    '>': '$gt',
    '<': '$lt',
    '>=': '$gte',
    '<=': '$gte',
    '=': '$eq',
  };

  // filters
  if (featured) {
    queryObject.featured = featured === 'true' ? true : false;
  };
  if (company) {
    queryObject.company = company;
  };
  if (name) {
    queryObject.name = { $regex: name, $options: 'i' };
  };
  if (numericFilters) {
    let filters = numericFilters.replace(regEx, match => `-${operatorMap[match]}-`);
    filters = filters.split(',').forEach(item => {
      const [field, operator, value] = item.split('-');
      if (numericOptions.includes(field) && !isNaN(value)) {
        queryObject[field] = { [operator]: Number(value) };
      };
    });
  };

  let result = Product.find(queryObject);

  // sorting
  if (sort) {
    const sortList = sort.split(',').join(' ');
    result = result.sort(sortList);
  } else {
    result = result.sort('createdAt');
  };

  if (fields) {
    const fieldsList = fields.split(',').join(' ');
    result = result.select(fieldsList);
  };

  // pagination
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;
  result = result.skip(skip).limit(limit);
  if (limit) {
    result = result.limit(limit);
  };

  const products = await result;
  res.status(200).json({ found: products.length, products })
};

export { getAllProductsStatic, getAllProducts };
