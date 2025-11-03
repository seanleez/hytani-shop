import { CustomError } from '@/classes';
import { EStatusCode } from '@/constants';
import { asyncWrapperMiddleware } from '@/middlewares';
import { ProductModel } from '@/models';

export const getProductController = asyncWrapperMiddleware(async (req, res, next) => {
  const product = await ProductModel.findById(req.params.id);

  if (!product) {
    throw new CustomError('Product not found', EStatusCode.NOT_FOUND);
  }

  res.status(EStatusCode.OK).json(product);
});
