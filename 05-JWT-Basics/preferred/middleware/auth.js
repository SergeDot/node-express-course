import jwt from 'jsonwebtoken';
import { UnauthenticatedError } from '../errors/unauthenticated.js';

const authenticationMiddleware = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new UnauthenticatedError(`No token provided`, 401);
  };

  const token = authHeader.split(' ')[1];

  try {
    const { name } = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { name };
    next();
  } catch (error) {
    throw new UnauthenticatedError(`Token error`, 401);
  };
};

export default authenticationMiddleware;
