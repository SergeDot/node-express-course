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

module.exports = { stringAfterLastSlash, stringInsideSlashes, isValidRegex };
