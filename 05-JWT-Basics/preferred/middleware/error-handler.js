import { BadRequestError } from '../errors/bad-request.js';

const errorHandlerMiddleware = (err, req, res, next) => {
  if (err instanceof BadRequestError) {
    return res.status(err.statusCode).json({ message: err.message });
  };
  return res.status(500).send('Something went wrong try again later');
};

export default errorHandlerMiddleware;
