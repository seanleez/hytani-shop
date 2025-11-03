import { ErrorRequestHandler } from 'express';
import mongoose from 'mongoose';

import { CustomError } from '../classes';
import { EStatusCode } from '../constants';

export type TErrorResponse = {
  statusCode: EStatusCode;
  message: string;
};

export const errorHandlerMiddleware: ErrorRequestHandler = (err, req, res, next) => {
  const errorResponse: TErrorResponse = {
    statusCode: EStatusCode.INTERNAL_SERVER_ERROR,
    message: 'Something went wrong, please try again'
  };

  if (err instanceof CustomError) {
    const { statusCode, message } = err;
    errorResponse.statusCode = statusCode;
    errorResponse.message = message;
  }

  // Handle Mongoose validation errors
  if (err instanceof mongoose.Error.ValidationError) {
    const message = Object.values(err.errors)
      .map(error => error.message)
      .join(', ');

    errorResponse.statusCode = EStatusCode.BAD_REQUEST;
    errorResponse.message = message;
  }

  // Mongoose errors
  if (err instanceof mongoose.MongooseError) {
    if (err.name === 'CastError') {
      errorResponse.statusCode = EStatusCode.BAD_REQUEST;
      errorResponse.message = `No item found with id: ${(err as any)?.value}`;
    } else {
      errorResponse.statusCode = EStatusCode.BAD_REQUEST;
      errorResponse.message = err.message;
    }
  }

  // Duplication errors
  if (err.name === 'MongoServerError' && (err as any).code === 11000) {
    const keyValue = (err as any).keyValue || {};
    const field = Object.keys(keyValue)[0];
    errorResponse.statusCode = EStatusCode.BAD_REQUEST;
    errorResponse.message = `${field.charAt(0).toUpperCase() + field.slice(1)} already exists`;
  }

  return res.status(errorResponse.statusCode).json({ message: errorResponse.message });
};
