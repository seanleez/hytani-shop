import { CustomError, UnauthorizedError } from '@classes';
import { EStatusCode } from '@constants';
import { asyncWrapperMiddleware } from '@middlewares';
import { ProductModel } from '@models';
import { RequestHandler } from 'express';

export const patchUpdateProductController: RequestHandler = asyncWrapperMiddleware(async (req, res, next) => {
  const { userId } = res.locals.user ?? {};

  const product = await ProductModel.findByIdAndUpdate(req.params.id, req.body, { new: true });

  if (!product) {
    throw new CustomError('Product not found', EStatusCode.NOT_FOUND);
  }

  if (product.listedBy.toString() !== userId) {
    throw new UnauthorizedError('You are not authorized to update this product');
  }

  res.status(EStatusCode.OK).json(product);
});
