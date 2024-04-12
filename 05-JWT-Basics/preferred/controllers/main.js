import jwt from 'jsonwebtoken';
import { BadRequestError } from '../errors/bad-request.js';

const logon = async (req, res) => {
  const { name, password } = req.body;
  if (!name || !password) {
    throw new BadRequestError(`Some credentials are missing. Please recheck`, 400);
  };

  const token = jwt.sign(
    { name },
    process.env.JWT_SECRET,
    { expiresIn: process.env.TOKEN_EXPIRATION }
  );
  res.status(200).json({ token });
};

const welcomeMessage = async (req, res) => {
  res.status(200)
    .json({
      message: `Welcome, ${req.user.name}! You are our first user! Congratulations! Invite your friends too!`
    });
};

export { logon, welcomeMessage };
