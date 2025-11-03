import { EStatusCode } from '@/constants';
import { asyncWrapperMiddleware } from '@/middlewares';
import { CartModel } from '@/models';
import mongoose from 'mongoose';

export const getCartController = asyncWrapperMiddleware(async (req, res, next) => {
  const { userId } = res.locals.user ?? {};

  const cart = await CartModel.findOne({ userId: new mongoose.Types.ObjectId(userId) });

  if (!cart) {
    await CartModel.create({
      userId,
      items: []
    });
  }

  await cart?.save();

  res.status(EStatusCode.OK).json(cart);
});
