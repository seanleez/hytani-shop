import { BadRequestError, NotFoundError } from '@classes';
import { EStatusCode } from '@constants';
import { asyncWrapperMiddleware } from '@middlewares';
import { CartModel } from '@models';
import { RequestHandler } from 'express';
import mongoose from 'mongoose';

export type TPatchUpdateProductQuantityInCartBody = {
  productId: string;
  quantity: string;
};

export const patchUpdateProductQuantityInCartController = asyncWrapperMiddleware<
  RequestHandler<any, any, TPatchUpdateProductQuantityInCartBody, any>
>(async (req, res, next) => {
  const { productId, quantity } = req.body;
  const { userId } = res.locals.user ?? {};

  const cart = await CartModel.findOne({ userId: new mongoose.Types.ObjectId(userId) });

  if (!cart) {
    throw new NotFoundError('Cart not found');
  }

  if (!cart.items.length) {
    throw new BadRequestError('Cart is empty');
  }

  const targetProductInCart = cart.items.find(item => item._id.toString() === productId);

  if (!targetProductInCart) {
    throw new NotFoundError('Product not found in cart');
  }

  targetProductInCart.quantity = Number(quantity);

  await cart.save();

  res.status(EStatusCode.OK).json(cart);
});
