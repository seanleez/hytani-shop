import { CustomError, UnauthorizedError } from '@/classes';
import { EStatusCode } from '@/constants';
import { asyncWrapperMiddleware } from '@/middlewares';
import { ProductModel } from '@/models';
import { RequestHandler } from 'express';

export const deleteProductController: RequestHandler = asyncWrapperMiddleware(async (req, res, next) => {
  const { userId } = res.locals.user ?? {};

  const product = await ProductModel.findByIdAndDelete(req.params.id);

  if (!product) {
    throw new CustomError('Product not found', EStatusCode.NOT_FOUND);
  }

  if (product.listedBy.toString() !== userId) {
    throw new UnauthorizedError('You are not authorized to delete this product');
  }

  res.status(EStatusCode.OK).json(product);
});
