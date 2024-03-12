const logger = (req, _, next) => {
  const method = req.method;
  const url = req.url;
  console.log(method, url);
  next();
};

module.exports = { logger };
