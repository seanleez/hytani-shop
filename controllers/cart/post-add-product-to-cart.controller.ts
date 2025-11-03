import { NotFoundError } from '@classes';
import { EStatusCode } from '@constants';
import { asyncWrapperMiddleware } from '@middlewares';
import { CartModel, ProductModel } from '@models';
import { RequestHandler } from 'express';
import mongoose from 'mongoose';

export type TPostProductToCartBody = {
  productId: string;
  quantity: string;
};

export const postAddProductToCartController = asyncWrapperMiddleware<RequestHandler<any, any, TPostProductToCartBody, any>>(
  async (req, res, next) => {
    const { productId, quantity } = req.body;
    const { userId } = res.locals.user ?? {};

    const cart = await CartModel.findOne({ userId: new mongoose.Types.ObjectId(userId) });

    if (!cart) {
      await CartModel.create({
        userId,
        items: []
      });
    }

    const product = await ProductModel.findOne({ _id: new mongoose.Types.ObjectId(productId) });

    if (!product) {
      throw new NotFoundError('Product not found');
    }

    const targetProductInCart = cart?.items.find(item => item._id.toString() === productId);

    if (targetProductInCart) {
      targetProductInCart.quantity += Number(quantity);
    } else {
      cart?.items.push({ ...product.toObject(), quantity: Number(quantity) });
    }

    await cart?.save();

    res.status(EStatusCode.CREATED).json(cart);
  }
);
