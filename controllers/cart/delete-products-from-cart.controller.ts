import { BadRequestError, NotFoundError } from '@classes';
import { EStatusCode } from '@constants';
import { asyncWrapperMiddleware } from '@middlewares';
import { CartModel } from '@models';
import { RequestHandler } from 'express';
import mongoose from 'mongoose';

export type TDeleteProductsFromCartBody = {
  productIds: string[];
};

export const deleteProductsFromCartController = asyncWrapperMiddleware<RequestHandler<any, any, TDeleteProductsFromCartBody, any>>(
  async (req, res, next) => {
    const { productIds } = req.body;
    const { userId } = res.locals.user ?? {};

    const cart = await CartModel.findOne({ userId: new mongoose.Types.ObjectId(userId) });

    if (!cart) {
      throw new NotFoundError('Cart not found');
    }

    if (!cart.items.length) {
      throw new BadRequestError('Cart is empty');
    }

    const productsAfterDeletion = cart.items.filter(productItem => !productIds.includes(productItem._id.toString()));
    cart.items = productsAfterDeletion;

    await cart.save();

    res.status(EStatusCode.OK).json(cart);
  }
);
