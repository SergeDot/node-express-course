import { BadRequestError } from '../errors/bad-request.js';
import { UnauthenticatedError } from '../errors/unauthenticated.js'

const errorHandlerMiddleware = (err, req, res, next) => {
  if (err instanceof BadRequestError || err instanceof UnauthenticatedError) {
    return res.status(err.statusCode).json({ message: err.message });
  };
  return res.status(500).send(`Something went wrong try again later ${res.status(err).json({ message: err.message })}`);
};

export default errorHandlerMiddleware;
