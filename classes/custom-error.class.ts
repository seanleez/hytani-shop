import { EStatusCode } from '../constants';

export class CustomError extends Error {
  statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
  }
}

export class UnauthorizedError extends CustomError {
  constructor(message: string) {
    super(message, EStatusCode.UNAUTHORIZED);
  }
}

export class BadRequestError extends CustomError {
  constructor(message: string) {
    super(message, EStatusCode.BAD_REQUEST);
  }
}

export class NotFoundError extends CustomError {
  constructor(message: string) {
    super(message, EStatusCode.NOT_FOUND);
  }
}
