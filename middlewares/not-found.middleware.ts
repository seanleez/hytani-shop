import { RequestHandler } from 'express';
import { CustomError } from '../classes';
import { EStatusCode } from '../constants';

export const notFoundMiddleware: RequestHandler = (req, res, next) => {
  throw new CustomError('Route not found', EStatusCode.NOT_FOUND);
};
