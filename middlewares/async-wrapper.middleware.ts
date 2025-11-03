import { RequestHandler } from 'express';

type TAsyncController<T extends RequestHandler> = (...params: Parameters<T>) => Promise<void>;

export const asyncWrapperMiddleware = <T extends RequestHandler = RequestHandler>(fn: TAsyncController<T>): T => {
  return (async (...params: Parameters<T>) => {
    const [req, res, next] = params;

    try {
      await fn(...params);
    } catch (error) {
      next(error);
    }
  }) as T;
};
