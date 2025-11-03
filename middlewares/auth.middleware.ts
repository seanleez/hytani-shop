import { RequestHandler } from 'express';
import { UnauthorizedError } from '../classes';
import jwt from 'jsonwebtoken';

export type TJWTDecodePayload = {
  userId?: string;
  username?: string;
  iat?: string;
  exp?: string;
};

export const authMiddleware: RequestHandler = (req, res, next) => {
  const { authorization } = req.headers;
  const accessToken = authorization?.split(' ')[1];

  if (!authorization || !authorization.startsWith('Bearer ') || !accessToken) {
    throw new UnauthorizedError('Authentication invalid');
  }

  try {
    const payload = jwt.verify(accessToken, process.env.JWT_SECRET ?? '') as TJWTDecodePayload;
    res.locals.user = payload;
    next();
  } catch (error) {
    throw new UnauthorizedError('Authentication invalid');
  }
};
